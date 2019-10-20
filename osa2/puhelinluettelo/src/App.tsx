import React, { useState } from 'react'
import { useContacts } from './contactService'

const App = () => {
  const [contacts, error, updateContact, createContact, deleteContact] = useContacts()
  const [newName, setNewName] = useState<string>('')
  const [newNumber, setNewNumber] = useState<string>('')
  const [filter, setFilter] = useState<string>('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (contacts && contacts.every(person => person.name !== newName)) {
      createContact({ name: newName, number: newNumber })
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

  function handleDelete(contact: Contact) {
    const response = window.confirm(`Delete ${contact.name}`)
    response && contact.id && deleteContact(contact.id)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <h2>Add new</h2>
      <AddNew newName={newName} newNumber={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={handleSubmit} />
      <h2>Numbers</h2>
      {contacts && <List contacts={contacts} filter={filter.toLowerCase()} onDelete={handleDelete} />}
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
  contacts: Contact[]
  filter: string
  onDelete: (contact: Contact) => void
}

const List = ({ filter, contacts, onDelete }: ListProps) => (
  <ul>
    {
      contacts
        .filter(({ name }) => name.toLowerCase().includes(filter))
        .map(({ name, number, id }) => (
          <li key={name}>{name}, {number}, <button onClick={() => onDelete({ name, number, id })}>delete</button></li>
        ))}
  </ul>
)

export default App