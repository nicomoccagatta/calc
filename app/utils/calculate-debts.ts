type tProps = {
  people: {
    name: string,
    amount: number,
  }[],
  personBill: number,
}

export function calculateDebts({
  people = [],
  personBill = 0,
} : tProps) {
  const debts = []
  let peopleAux = people.map(person => ({
    name: person.name,
    status: person.amount - personBill,
  }))

  while (peopleAux.length > 1) {
    const receiverPersonIdx = peopleAux.findIndex(p => p.status > 0)
    const maxAmountToReceive = peopleAux[receiverPersonIdx].status
    
    const debtPersonIdx = peopleAux.findIndex(p => p.status < 0)
    const maxAmountToSend = Math.abs(peopleAux[debtPersonIdx].status)

    const debtAmount = Math.min(maxAmountToReceive, maxAmountToSend)
    peopleAux[receiverPersonIdx].status -= debtAmount
    peopleAux[debtPersonIdx].status += debtAmount

    debts.push({
      nameFrom: peopleAux[debtPersonIdx].name,
      nameTo: peopleAux[receiverPersonIdx].name,
      debtAmount,
    })

    peopleAux = peopleAux.filter(person => person.status !== 0)
  }

  return debts
}
