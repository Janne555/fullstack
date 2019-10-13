import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState<{ name: string, number: string }[]>([
    { name: 'Arto Hellas', number: '123123123' }
  ])
  const [newName, setNewName] = useState<string>('')
  const [newNumber, setNewNumber] = useState<string>('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(({ name, number }) => <li key={name}>{name}, {number}</li>)
        }
      </ul>
    </div>
  )

}

export default App