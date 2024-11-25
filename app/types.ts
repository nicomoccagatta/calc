export type Debt = {
  nameFrom: string,
  nameTo: string,
  debtAmount: number,
}

export type Person = {
  name: string,
  concept: string,
  amount: number,
}

export type State = {
  debts: Debt[],
  people: Person[],
  personBill: number,
  totalAmount: number,
}

export type Action = {
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any,
}
