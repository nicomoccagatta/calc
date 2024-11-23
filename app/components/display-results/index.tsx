import React from "react"

type tProps = {
  className: string,
  dispatch: ({ type, idx } : { type: string, idx?: number }) => void,
  people: [],
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
  dispatch,
  people,
  personBill,
  totalAmount,
} : tProps) {
  return (
    <div className={className}>
      <div className="text-xl" id="display-results">
        <p>Total: ${totalAmount} {personBill ? '($' + personBill + ' cada uno)' : ''}</p>
        <p className="mt-4 mb-4">Personas</p>
        {people.map(
          ({ name, amount }: { name: string, amount: number }, idx: number) => {
            const bill = amount - personBill
            if (bill === 0) {
              return (
                <li key={`${name}-${amount}`}>
                  {name} pagó {amount}
                  <button
                    onClick={() => dispatch({ type: 'delete_person', idx })}
                    className="ml-4 select-none rounded-xl p-1 bg-white text-black"
                  >
                    Eliminar
                  </button>
                </li>
              )
            }
            const status = bill > 0 ? 'debe recibir' : 'debe pagar'
            return (
              <li className="mb-2" key={`${name}-${amount}`}>
                {bill < 0 ? '❌ ' : ''}{name} pagó {amount}, {status} {Math.abs(bill)}
                <button
                  onClick={() => dispatch({ type: 'delete_person', idx })}
                  className="ml-4 select-none rounded-xl p-1 bg-white text-black"
                >
                  Eliminar
                </button>
              </li>
            )
          })
        }
      </div>
      <div className="flex justify-center">
        <button className="bg-white text-black p-2 px-12 rounded-xl max-h-12 max-w-96" onClick={copyClipboard}>📋 Copy text</button>
      </div>
    </div>
  )
}
