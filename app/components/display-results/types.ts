import {
  Action,
  Debt,
  Person,
} from "@/app/types"

export type tProps = {
  className: string,
  debts: Debt[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ({ type, payload } : Action) => void,
  people: Person[],
  personBill: number,
  totalAmount: number,
}
