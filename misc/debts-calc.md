### Calculate debts
```js
// Initial values
people: [
  { name: 'Nico', amount: 2000},
  { name: 'Mica', amount: 2000},
  { name: 'Pepe', amount: 0},
  { name: 'Pepa', amount: 0},
]
personBill: 1000,

// Expected result
debts: [
  { nameFrom: 'Pepe', nameTo: 'Nico', amount: 1000},
  { nameFrom: 'Pepa', nameTo: 'Mica', amount: 1000},
]


// 1 step ( Initial Status )
peopleAux: [
  { name: 'Nico', amount: 2000, status: 1000},
  { name: 'Mica', amount: 2000, status: 1000},
  { name: 'Pepe', amount: 0, status: -1000},
  { name: 'Pepa', amount: 0, status: -1000},
]

// 2 step ( 1st debt generation )
  // Pick first one with status negative
  // Determine how much it can send to first one with status positive and send it (generate debt obj)
  // Update status accordingly
peopleAux: [
  { name: 'Nico', amount: 2000, status: 0 },
  { name: 'Mica', amount: 2000, status: 1000 },
  { name: 'Pepe', amount: 0, status: 0 },
  { name: 'Pepa', amount: 0, status: -1000 },
]
debts: [
  { nameFrom: 'Pepe', nameTo: 'Nico', amount: 1000 }
]

// 3rd step (filter status 0)
  // Filter objects with status 0
peopleAux: [
  { name: 'Mica', amount: 2000, status: 1000 },
  { name: 'Pepa', amount: 0, status: -1000 },
]

// Repite steps 2 & 3 indefinitely until peopleAux is empty
```
