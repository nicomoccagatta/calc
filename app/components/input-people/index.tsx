import React, { useRef, useState } from "react"

export default function InputPeople({
  onClick,
}: {
  onClick: ({ name, amount }: { name: string, amount: number }) => void,
}) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)
  const nameRef = useRef<HTMLInputElement>(null)

  const handleOKClick = () => {
    onClick({ name, amount })
    setName("")
    setAmount(0)
    nameRef?.current?.focus()
  }

  return (
    <form className="grid bg-blue-200 p-4" onClick={e => e.preventDefault()}>
      <input
        autoFocus
        className="mb-2 text-black"
        type="text"
        name="name"
        placeholder="Nombre"
        onChange={e => setName(e.target.value)}
        value={name}
        ref={nameRef}
      />
      <input
        className="mb-2 text-black"
        type="number"
        name="amount"
        placeholder="Cuanto gasto?"
        onChange={e => setAmount(Number(e.target.value))}
        value={amount}
      />
      <button className="bg-blue-800" onClick={handleOKClick}>Agregar</button>
    </form>
  )
}
