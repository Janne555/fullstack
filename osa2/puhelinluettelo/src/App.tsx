import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState<{ name: string, number: string }[]>([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState<string>('')
  const [newNumber, setNewNumber] = useState<string>('')
  const [filter, setFilter] = useState<string>('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (persons.every(person => person.name !== newName)) {
      setPersons(prev => [...prev, { name: newName, number: newNumber }])
      setNewName('')
      setNewNumber('')
    }
    else
      alert(`${newName} is already in the phonebook`)
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewName(event.target.value)
  }

  function handleNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewNumber(event.target.value)
  }

  function handleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <h2>Add new</h2>
      <AddNew newName={newName} newNumber={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <List persons={persons} filter={filter.toLowerCase()} />
    </div>
  )
}

const Filter = ({ onChange }: { onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <>
      filter shown with <input onChange={onChange} />
    </>
  )
}

type AddNewProps = {
  newName: string
  newNumber: string
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent) => void
}

const AddNew = ({ newName, newNumber, onNameChange, onNumberChange, onSubmit }: AddNewProps) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

type ListProps = {
  persons: { name: string, number: string }[]
  filter: string
}

const List = ({ filter, persons }: ListProps) => (
  <ul>
    {
      persons.filter(({ name }) => name.toLowerCase().includes(filter)).map(({ name, number }) => <li key={name}>{name}, {number}</li>)}
  </ul>
)

export default App