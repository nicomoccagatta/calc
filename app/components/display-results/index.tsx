import React, {
  Dispatch,
  MutableRefObject,
  useState,
  useRef,
  SetStateAction,
} from "react"
import * as Toast from "@radix-ui/react-toast"
import { totalPaymentsAmountCalc } from "@/app/utils"
import { Person } from "@/app/types"
import { tProps } from "./types"
import "./styles.css"


const copyClipboard = (peopleLength: number, openToast: Dispatch<SetStateAction<boolean>>, timerRef: MutableRefObject<number>) => {
  let copyText = document.getElementById("display-results")?.innerText
  if (copyText) {
    copyText = copyText.replaceAll("Eliminar", "")
    copyText = copyText.replace(`Personas (${peopleLength})\n\n`, `Personas (${peopleLength})\n`)
    copyText = copyText.replace("Deudas\n\n", "Deudas\n")
    navigator.clipboard.writeText(copyText)
  }
  displayToast(openToast, timerRef)
}

const displayToast = (openToast: Dispatch<SetStateAction<boolean>>, timerRef: MutableRefObject<number>) => {
  openToast(false);
  window.clearTimeout(timerRef.current);
  timerRef.current = window.setTimeout(() => {
    openToast(true);
  }, 100);
}

export default function DisplayResults({
  className,
  debts,
  dispatch,
  people,
  personBill,
  totalAmount,
} : tProps) {
  const [toast, openToast] = useState(false)
  const timerRef = useRef(0)

  const personBillContent = personBill ? " ($" + personBill.toLocaleString() + " cada uno)" : ""
  const totalAmountContent = `Total: ${totalAmount.toLocaleString()}${personBillContent}`

  return (
    <div className={className}>
  		<Toast.Provider swipeDirection="right">
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
            onClick={() => copyClipboard(people.length, openToast, timerRef)}
          >
            📋 Copiar texto
          </button>
        </div> : null }
        <Toast.Root className="ToastRoot" open={toast} onOpenChange={openToast}>
          <Toast.Title className="ToastTitle">✅&nbsp;&nbsp;Texto copiado</Toast.Title>
          <Toast.Close>x</Toast.Close>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
		  </Toast.Provider>
    </div>
  )
}
