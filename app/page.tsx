"use client"

import React, { useReducer } from "react"
import InputPeople from "@/app/components/input-people"
import DisplayResults from "@/app/components/display-results"
import { calculateDebts } from "@/app/utils"
import { State, Action } from "@/app/types"
import { totalPaymentsAmountCalc } from "@/app/utils"
import { Card, Text } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import "./theme-overrides.css"

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

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { debts, people, personBill, totalAmount } = state

  console.log('[DEBUG]', JSON.stringify(state,null,2))
  return (
    <div className="pt-8">
      {/* @ts-expect-error: Let's ignore a compile error like this for custom styling */}
      <Card size="3" variant="classic" className="min-w-full" style={{ "--card-border-radius": 'none' }}>
        <Text align="center" as="div" color="bronze" className="md:text-6xl sm:text-4xl text-3xl">CUENTAS CLARAS CONSERVAN LA AMISTAD</Text>
      </Card>
      <div className="grid items-center justify-items-center p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 items-center w-full">
          <div className="lg:flex justify-around w-full">
            <InputPeople
              className="lg:w-4/12 mb-8 h-full"
              onClick={person => dispatch({ type: 'add_person', payload: person }) }
            />
            <DisplayResults
              className="lg:w-6/12"
              debts={debts}
              dispatch={dispatch}
              people={people}
              personBill={personBill}
              totalAmount={totalAmount}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
