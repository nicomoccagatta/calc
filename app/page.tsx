"use client"

import React, { useReducer } from "react"
import InputPeople from "@/app/components/input-people"
import DisplayResults from "@/app/components/display-results"

function reducer(state, action) {
  if (action.type === 'add_person') {
    const { name, amount } = action.person
    return {
      people: [
        ...state.people,
        { name, amount },
      ],
      amount: state.amount + amount,
    }
  }

  if (action.type === 'delete_person') {
    const newAmount = state.amount - state.people[action.idx].amount
    const newPeople = [...state.people]
    newPeople.splice(action.idx, 1)
    return {
      ...state,
      amount: newAmount,
      people: newPeople,
    }
  }

  throw Error('Unknown action.')
}

const initialState = {
  people: [],
  amount: 0,
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const personBill = Math.round(state.amount / state.people.length)
  const totalAmount = state.amount
  const people = state.people

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
