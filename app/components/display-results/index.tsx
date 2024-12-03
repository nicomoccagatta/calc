import React from "react"
import { totalPaymentsAmountCalc } from "@/app/utils"
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

const copyClipboard = (peopleLength: number) => {
  let copyText = document.getElementById("display-results")?.innerText
  if (copyText) {
    copyText = copyText.replaceAll("Eliminar", "")
    copyText = copyText.replace(`Personas (${peopleLength})\n\n`, `Personas (${peopleLength})\n`)
    copyText = copyText.replace("Deudas\n\n", "Deudas\n")
    navigator.clipboard.writeText(copyText)
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
  const personBillContent = personBill ? " ($" + personBill.toLocaleString() + " cada uno)" : ""
  const totalAmountContent = `Total: ${totalAmount.toLocaleString()}${personBillContent}`

  return (
    <div className={className}>
      <div className="text-xl bg-white rounded-lg p-8" id="display-results">
        <p>{totalAmountContent}</p>
        {/* @TODO: Componentize People below */}
        {people.length ? <p className="mt-8 mb-2">{`Personas (${people.length})`}</p> : null}
        {people.length ? people.map(
          ({ name, payments }: Person, idx: number) => {
            const totalPaymentsAmount = totalPaymentsAmountCalc(payments)
            const concepts = payments.filter(p => p.concept).map(p => p.concept)
            if ((totalPaymentsAmount > 0) && (concepts.length < payments.length)) {
              concepts.push('etc')
            }
            const conceptsJoined = concepts.length ? " (" + concepts.join(", ") + ")" : ""
            const amountPayed = totalPaymentsAmount? ` pagó $${totalPaymentsAmount.toLocaleString()}` : ""
            return (
              <li key={`${name}-${payments[0].amount}`} className="list-none mb-2">
              {`▶︎ ${name}${amountPayed}${conceptsJoined}`}
              <button
                onClick={() => dispatch({ type: 'delete_person', payload: { idx } })}
                className="ml-4 select-none rounded-xl px-2 bg-black text-white"
              >
                Eliminar
              </button>
            </li>
            )
          }) : null
        }
        {/* @TODO: Componentize Debts below */}
        {debts.length ? <p className="mt-8 mb-2">Deudas</p> : null}
        {debts.length ? debts.map(
          ({ nameFrom, nameTo, debtAmount }: { nameFrom: string, nameTo: string, debtAmount: number }) => {
            const bankDetailsNameTo = people.find(p => p.name === nameTo)?.bankDetails
            return (
              <li className="list-none mb-2" key={`${nameFrom}-${nameTo}-${debtAmount}`}>
                {`❌ ${nameFrom} debe pagar a ${nameTo}: $${debtAmount.toLocaleString()}`}
                {bankDetailsNameTo ? (
                  <><br /><span>CBU/Alias: {bankDetailsNameTo}</span></>
                ) : null}
              </li>
            )
          }) : null
        }
      </div>
      {debts.length ? <div className="flex justify-start mt-8">
        <button
          className="bg-white text-black p-2 px-12 rounded-xl max-h-12 max-w-96"
          onClick={() => copyClipboard(people.length)}
        >
          📋 Copiar texto
        </button>
      </div> : null }
    </div>
  )
}
