"use client"

import React, { useReducer } from "react"
import InputPeople from "@/app/components/input-people"

function reducer(state, action) {
  if (action.type === 'add_person') {
    const { name, amount } = action.person
    return {
      people: [
        ...state.people,
        { name, amount },
      ]
    }
  }

  throw Error('Unknown action.')
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, { people: [] })

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <InputPeople onClick={person => dispatch({ type: 'add_person', person }) } />
        <p>Personas:</p> {state.people.map(({ name, amount }) => (<li key={`${name}-${amount}`}>{name}: {amount}</li>))}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
