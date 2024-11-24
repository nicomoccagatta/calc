"use client"

import React, { useReducer } from "react"
import InputPeople from "@/app/components/input-people"
import DisplayResults from "@/app/components/display-results"
import { calculateDebts } from "@/app/utils"

function reducer(state, action) {
  if (action.type === 'add_person') {
    const { name, amount } = action.person
    const newPeople = [
      ...state.people,
      { name, amount },
    ]
    const newTotalAmount = state.totalAmount + amount
    const newTotalPeople = state.people.length + 1
    const newPersonBill = Math.round(newTotalAmount / newTotalPeople)
    const debts = calculateDebts({ people: newPeople, personBill: newPersonBill })

    return {
      debts,
      people: newPeople,
      personBill: newPersonBill,
      totalAmount: newTotalAmount,
    }
  }

  if (action.type === 'delete_person') {
    const newTotalAmount = state.totalAmount - state.people[action.idx].amount
    const newPeople = [...state.people]
    newPeople.splice(action.idx, 1)
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
  people: [],
  personBill: 0,
  totalAmount: 0,
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { debts, people, personBill, totalAmount } = state

  console.log('[DEBUG]', JSON.stringify(state,null,2))
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full">
        <div className="flex justify-around w-full">
          <InputPeople
            className="w-5/12"
            onClick={person => dispatch({ type: 'add_person', person }) }
          />
          <DisplayResults
            className="grid w-5/12"
            debts={debts}
            dispatch={dispatch}
            people={people}
            personBill={personBill}
            totalAmount={totalAmount}
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  )
}
