import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPersons(prev => [...prev, { name: newName }])
    setNewName('')
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {
        persons.map(person => <li key={person.name}>{person.name}</li>)
      }
      </ul>
    </div>
  )

}

export default App