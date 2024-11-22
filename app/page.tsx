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

  console.log('[DEBUG]', JSON.stringify(state,null,2))
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-12">
          <InputPeople onClick={person => dispatch({ type: 'add_person', person }) } />
          <div className="w-96 h-96">
            <div><p>Total: ${state.amount} {personBill ? '($' + personBill + ' cada uno)' : ''}</p></div>
            <p className="mt-4 mb-4">Personas</p>
            {state.people.map(
              ({ name, amount }: { name: string, amount: number }, idx: number) => {
                const bill = amount - personBill
                if (bill === 0) {
                  return (
                    <li key={`${name}-${amount}`}>
                      {name} pagó {amount}
                      <button
                        onClick={() => dispatch({ type: 'delete_person', idx })}
                        className="ml-4 rounded-xl p-1 bg-white text-black"
                      >
                        Eliminar
                      </button>
                    </li>
                  )
                }
                const status = bill > 0 ? 'debe recibir' : 'debe pagar'
                return (
                  <li className="mb-2" key={`${name}-${amount}`}>
                    {name} pagó {amount}, {status} {Math.abs(bill)}
                    <button
                      onClick={() => dispatch({ type: 'delete_person', idx })}
                      className="ml-4 rounded-xl p-1 bg-white text-black"
                    >
                      Eliminar
                    </button>
                  </li>
                )
              })
            }
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
