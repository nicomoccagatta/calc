"use client"

import React, { useReducer, useState, useMemo } from "react"
import dynamic from "next/dynamic"
import InputPeople from "@/app/components/input-people"
import { calculateDebts } from "@/app/utils"
import { State, Action } from "@/app/types"
import { totalPaymentsAmountCalc } from "@/app/utils"
import { Card, Text, Link, Flex, Switch } from "@radix-ui/themes"
import { translations, Language } from "@/app/translations"
import { useTranslationDetection } from "@/app/hooks/useTranslationDetection"

const DisplayResults = dynamic(() => import("@/app/components/display-results"), {
  ssr: false,
  loading: () => <div className="lg:w-6/12" />,
})

function reducer(state: State, action: Action): State {
  if (action.type === 'add_person') {
    const { name, bankDetails, payments } = action.payload
    const newPeople = [
      ...state.people,
      { name, bankDetails, payments },
    ]
    const newTotalAmount = state.totalAmount + totalPaymentsAmountCalc(payments)
    const newTotalPeople = state.people.length + 1
    const newPersonBill = Math.round(newTotalAmount / newTotalPeople)
    const debts = calculateDebts({ people: newPeople, personBill: newPersonBill })

    return {
      ...state,
      debts,
      people: newPeople,
      personBill: newPersonBill,
      totalAmount: newTotalAmount,
    }
  }

  if (action.type === 'delete_person') {
    const { idx } = action.payload
    const newTotalAmount = state.totalAmount - totalPaymentsAmountCalc(state.people[idx].payments)
    const newPeople = [...state.people]
    newPeople.splice(idx, 1)
    const newTotalPeople = newPeople.length
    const newPersonBill = Math.round(newTotalAmount / newTotalPeople)
    const debts = calculateDebts({ people: newPeople, personBill: newPersonBill })

    return {
      ...state,
      debts,
      people: newPeople,
      personBill: newPersonBill,
      totalAmount: newTotalAmount,
    }
  }

  throw Error('Unknown action.')
}

const initialState = {
  debts: [],
  people: [],
  personBill: 0,
  totalAmount: 0,
}

export default function HomeClient() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { debts, people, personBill, totalAmount } = state
  const [language, setLanguage] = useState<Language>('es')
  const { isAutoTranslating } = useTranslationDetection()
  const t = useMemo(() => translations[language], [language])

  return (
    <div className="pt-8">
      {!isAutoTranslating && (
        <div className="absolute top-2 right-4">
          <Flex align="center" gap="3">
            <Text size="2" weight="bold" style={{ opacity: language === 'es' ? 1 : 0.5 }}>
              🇪🇸 ES
            </Text>
            <Switch
              size="2"
              checked={language === 'en'}
              onCheckedChange={(checked) => setLanguage(checked ? 'en' : 'es')}
            />
            <Text size="2" weight="bold" style={{ opacity: language === 'en' ? 1 : 0.5 }}>
              🇬🇧 EN
            </Text>
          </Flex>
        </div>
      )}
      {/* @ts-expect-error: Let's ignore a compile error like this for custom styling */}
      <Card size="3" variant="classic" className="min-w-full relative" style={{ "--card-border-radius": 'none' }}>
        <Text align="center" as="div" color="bronze" className="md:text-6xl sm:text-4xl text-3xl">{t.header}</Text>
      </Card>
      <div className="grid items-center justify-items-center p-4 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 items-center w-full">
          <div className="lg:flex justify-around w-full">
            <InputPeople
              className="lg:w-4/12 mb-8 h-full"
              onClick={person => dispatch({ type: 'add_person', payload: person }) }
              translations={t}
            />
            {people.length ? (
              <DisplayResults
                className="lg:w-6/12"
                debts={debts}
                dispatch={dispatch}
                people={people}
                personBill={personBill}
                totalAmount={totalAmount}
                translations={t}
              />
            ) : (
              <div className="lg:w-6/12" />
            )}
          </div>
        </main>
      </div>
      {/* @ts-expect-error: Let's ignore a compile error like this for custom styling */}
      <Card size="2" variant="classic" className="min-w-full mt-8" style={{ "--card-border-radius": 'none' }}>
        <Text align="center" as="div" size="2" color="gray">
          {t.madeBy}{' '}
          <Link href="https://www.nicomoccagatta.com" target="_blank" rel="noopener noreferrer" color="orange">
            Nicolas Moccagatta
          </Link>
        </Text>
      </Card>
    </div>
  )
}
