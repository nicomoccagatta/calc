import React, { useRef, useState } from "react"

export default function InputPeople({
  className,
  onClick,
}: {
  className: string,
  onClick: ({ name, amount }: { name: string, amount: number | '' }) => void,
}) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState<number | ''>(0)
  const nameRef = useRef<HTMLInputElement>(null)

  const handleOKClick = () => {
    if (!name) return

    onClick({ name, amount })
    setName("")
    setAmount(0)
    nameRef?.current?.focus()
  }

  return (
    <div className={className}>
      <form className="grid bg-blue-200 rounded-xl pt-4 px-8 pb-48 w-full h-full" onClick={e => e.preventDefault()}>
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
        <label className="text-black px-1 mb-1">¿Cuanto gasto?</label>
        <input
          className="mb-4 rounded-xl text-black px-2 h-12"
          type="number"
          name="amount"
          placeholder="¿Cuanto gasto?"
          onChange={e => setAmount(e.target.value ? Number(e.target.value) : '')}
          value={amount}
        />
        <button className="bg-blue-800 h-12 rounded-2xl" onClick={handleOKClick}>Agregar</button>
      </form>
    </div>
  )
}
