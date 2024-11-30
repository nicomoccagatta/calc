import React, { useRef, useState } from "react"
import type { Payment, Person } from '@/app/types'

const defaultPayment = {
  concept: '',
  amount: 0,
}

export default function InputPeople({
  className,
  onClick,
}: {
  className: string,
  onClick: ({ name, bankDetails, payments }: Person) => void,
}) {
  const [name, setName] = useState<string>("")
  const [bankDetails, setBankDetails] = useState<string>("")
  const [payments, setPayments] = useState<Payment[]>([{...defaultPayment}])
  const nameRef = useRef<HTMLInputElement>(null)

  const handleOKClick = () => {
    if (!name) return

    onClick({ name, bankDetails, payments })
    setName("")
    setBankDetails("")
    setPayments([{...defaultPayment}])
    nameRef?.current?.focus()
  }

  const setConcept = (concept: string, idx: number) => {
    const newPayments = [...payments]
    newPayments[idx].concept = concept
    setPayments(newPayments)
  }

  const setAmount = (amount: number, idx: number) => {
    const newPayments = [...payments]
    newPayments[idx].amount = amount
    setPayments(newPayments)
  }

  const addPayment = () => {
    setPayments(payments => [...payments, {...defaultPayment}])
  }

  const removePayment = (idx: number) => {
    const newPayments = [...payments]
    newPayments.splice(idx, 1)
    setPayments(newPayments)
  }

  return (
    <div className={className}>
      <form
        className="grid bg-blue-200 rounded-xl p-8 w-full"
        onClick={e => e.preventDefault()}
      >
        <label className="text-black px-1 mb-1">Nombre</label>
        <input
          autoFocus
          className="mb-4 rounded-xl px-2 text-black h-12"
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={e => setName(e.target.value)}
          value={name}
          ref={nameRef}
        />
        <label className="text-black px-1 mb-1">CBU/Alias</label>
        <input
          autoFocus
          className="mb-4 rounded-xl px-2 text-black h-12"
          type="text"
          name="bankDetails"
          placeholder="CBU/Alias"
          onChange={e => setBankDetails(e.target.value)}
          value={bankDetails}
        />
        <label className="text-black px-1 mb-1">
          Pagos
          <button
            onClick={addPayment}
            className="bg-blue-800 text-white px-2 ml-2 rounded-full"
            type="button"
          >
            +
          </button>
        </label>
        {payments.map((payment, idx) => (
          <div className="flex mb-4" key={idx}>
            <input
              className="w-4/6 rounded-l-xl text-black px-2 mr-2 h-12"
              type="text"
              name="concept"
              placeholder="Concepto (opcional)"
              onChange={e => setConcept(e.target.value, idx)}
              value={payment.concept}
            />
            <input
              className="w-2/6 rounded-r-xl text-center text-black px-2 h-12"
              type="number"
              name="amount"
              placeholder="$$$"
              onChange={e => setAmount(Number(e.target.value), idx)}
              value={payment.amount || ''}
            />
            <button
              className="bg-blue-800 text-white px-4 ml-2 rounded-full disabled:bg-gray-500"
              onClick={() => removePayment(idx)}
              disabled={payments.length === 1}
              type="button"
            >
              X
            </button>
          </div>
        ))}
        <button
          className="bg-blue-800 h-12 rounded-2xl"
          onClick={handleOKClick}
          type="submit"
        >
          Agregar persona
        </button>
      </form>
    </div>
  )
}
