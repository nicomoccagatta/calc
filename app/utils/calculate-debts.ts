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
  return people
}
