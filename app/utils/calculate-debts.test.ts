import { calculateDebts } from './calculate-debts.ts'

import assert from 'node:assert/strict'
import test from 'node:test'

test('happy path misc/debts-calc.md', () => {
  // Arrange
  const people = [
    { name: 'Nico', amount: 2000},
    { name: 'Mica', amount: 2000},
    { name: 'Pepe', amount: 0},
    { name: 'Pepa', amount: 0},
  ]
  const personBill = 1000

  // Act
  const debts = calculateDebts({ people, personBill })

  // Assert
  assert.deepEqual(debts, [
    { nameFrom: 'Pepe', nameTo: 'Nico', debtAmount: 1000 },
    { nameFrom: 'Pepa', nameTo: 'Mica', debtAmount: 1000 },
  ])
})
