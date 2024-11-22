import React from "react"

type tProps = {
  dispatch: ({ type, idx } : { type: string, idx?: number }) => void,
  people: [],
  personBill: number,
  totalAmount: number,
}

export default function DisplayResults({
  dispatch,
  people,
  personBill,
  totalAmount,
} : tProps) {
  return (
    <div className="w-96 h-96">
      <div><p>Total: ${totalAmount} {personBill ? '($' + personBill + ' cada uno)' : ''}</p></div>
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
  )
}
