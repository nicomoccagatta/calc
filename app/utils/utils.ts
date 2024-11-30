import { Payment } from "@/app/types"

export const totalPaymentsAmountCalc = (payments: Payment[]) => 
  payments.reduce((acc: number, payment: Payment) => acc + payment.amount, 0)
