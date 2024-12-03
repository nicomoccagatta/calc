import React, { useRef, useState } from "react"
import type { Payment, Person } from '@/app/types'
import { Card, Text, Button, Flex, TextField } from "@radix-ui/themes"
import * as Form from "@radix-ui/react-form"
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons"

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
    <Card className={className}>
      <Form.Root
        className="grid p-4 w-full "
        onSubmit={e => e.preventDefault()}
      >
        <Form.Field name="name" className="p-4">
          <Text as="div" weight="bold" mb="1" ml="2" size="3" color="bronze">
            Nombre
          </Text>
          <TextField.Root
            placeholder="Nombre"
            radius="full"
            size="3"
            color="blue"
            variant="soft"
            autoFocus
            onChange={e => setName(e.target.value)}
            value={name}
            ref={nameRef}
          />
        </Form.Field>

        <Form.Field name="bankDetails" className="p-4">
          <Text as="div" weight="bold" mb="1" ml="2" size="3" color="bronze">
            Alias - CBU
          </Text>
          <TextField.Root
            placeholder="Alias - CBU"
            radius="full"
            size="3"
            color="blue"
            variant="soft"
            onChange={e => setBankDetails(e.target.value)}
            value={bankDetails}
          />
        </Form.Field>

        <Form.Field name="payments">
          <Flex direction="column" gap="4" p="4">
            <Flex align="center">
              <Text as="div" weight="bold" ml="2" mr="2" size="3" color="bronze">
                Pagos
              </Text>
              <Button radius="full" size="1" variant="outline" onClick={addPayment} type="button">
                <PlusIcon />
              </Button>
            </Flex>
            {payments.map((payment, idx) => (
              <Flex align="center" key={idx}>
                <TextField.Root
                  placeholder="Concepto"
                  size="3"
                  radius="full"
                  className="w-4/6"
                  color="blue"
                  variant="soft"
                  onChange={e => setConcept(e.target.value, idx)}
                  value={payment.concept}
                />
                <TextField.Root
                  placeholder="Monto"
                  size="3"
                  radius="full"
                  ml="2"
                  className="w-2/6"
                  color="blue"
                  variant="soft"
                  onChange={e => setAmount(Number(e.target.value), idx)}
                  value={payment.amount || ''}
                />
                <Button
                  radius="full"
                  size="1"
                  variant="outline"
                  ml="2"
                  disabled={payments.length === 1}
                  onClick={() => removePayment(idx)}
                  type="button"
                >
                  <Cross1Icon />
                </Button>
              </Flex>
            ))}
          </Flex>
        </Form.Field>

        <Form.Submit asChild>
          <Flex direction="column" gap="4" p="4">
            <Button radius="full" size="4" variant="classic" onClick={handleOKClick}>
              Agregar Persona
            </Button>
          </Flex>
        </Form.Submit>
      </Form.Root>
    </Card>
  )
}
