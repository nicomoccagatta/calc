import React from "react"
import {
  Action,
  Debt,
  Person,
} from "@/app/types"

type tProps = {
  className: string,
  debts: Debt[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ({ type, payload } : Action) => void,
  people: Person[],
  personBill: number,
  totalAmount: number,
}

const copyClipboard = () => {
  const copyText = document.getElementById("display-results")
  if (copyText?.textContent) {
    navigator.clipboard.writeText(copyText?.innerText.replaceAll("\n\n", "\n").replaceAll("Eliminar", ""))
  }
}

export default function DisplayResults({
  className,
  debts,
  dispatch,
  people,
  personBill,
  totalAmount,
} : tProps) {
  return (
    <div className={className}>
      <div className="text-xl" id="display-results">
        <p>Total: ${totalAmount.toLocaleString()} {personBill ? '($' + personBill.toLocaleString() + ' cada uno)' : ''}</p>
        <p className="mt-4 mb-4">Personas</p>
        {people.map(
          ({ name, amount }: { name: string, amount: number }, idx: number) => {
            return (
              <li key={`${name}-${amount}`} className="list-none mb-2">
              {`▶︎ ${name}${amount? ` pagó $${amount.toLocaleString()}` : ''} `}
              <button
                onClick={() => dispatch({ type: 'delete_person', payload: idx })}
                className="ml-4 select-none rounded-xl p-1 bg-white text-black"
              >
                Eliminar
              </button>
            </li>
            )
          })
        }
        <p className="mt-4 mb-4">Deudas</p>
        {debts.map(
          ({ nameFrom, nameTo, debtAmount }: { nameFrom: string, nameTo: string, debtAmount: number }) => {
            return (
              <li className="list-none mb-2" key={`${nameFrom}-${nameTo}-${debtAmount}`}>
                {`❌ ${nameFrom} debe pagar a ${nameTo}: $${debtAmount.toLocaleString()}`}
              </li>
            )
          })
        }
      </div>
      <div className="flex justify-start">
        <button className="bg-white text-black p-2 px-12 rounded-xl max-h-12 max-w-96" onClick={copyClipboard}>📋 Copy text</button>
      </div>
    </div>
  )
}
