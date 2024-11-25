import React, { useRef, useState } from "react"

export default function InputPeople({
  className,
  onClick,
}: {
  className: string,
  onClick: ({ name, concept, amount }: { name: string, concept: string, amount: number | '' }) => void,
}) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState<number | ''>("")
  const [concept, setConcept] = useState<string>("")
  const nameRef = useRef<HTMLInputElement>(null)

  const handleOKClick = () => {
    if (!name) return

    onClick({ name, concept, amount: amount ? amount : 0 })
    setName("")
    setConcept("")
    setAmount("")
    nameRef?.current?.focus()
  }

  return (
    <div className={className}>
      <form className="grid bg-blue-200 rounded-xl p-8 w-full h-full" onClick={e => e.preventDefault()}>
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
        <label className="text-black px-1 mb-1">Pagos</label>
        <div className="flex mb-4">
          <input
            className="w-4/6 rounded-l-xl text-black px-2 mr-2 h-12"
            type="text"
            name="concept"
            placeholder="Concepto (opcional)"
            onChange={e => setConcept(e.target.value)}
            value={concept}
          />
          <input
            className="w-2/6 rounded-r-xl text-center text-black px-2 h-12"
            type="number"
            name="amount"
            placeholder="$$$"
            onChange={e => setAmount(e.target.value ? Number(e.target.value) : '')}
            value={amount}
          />
        </div>
        <button className="bg-blue-800 h-12 rounded-2xl" onClick={handleOKClick}>Agregar persona</button>
      </form>
    </div>
  )
}
