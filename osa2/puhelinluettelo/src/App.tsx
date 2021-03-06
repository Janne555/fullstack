import React, { useState } from 'react'
import { useContacts } from './contactService'
import Message from './Message'
import AddContact from './AddContact'
import List from './List'

const App = () => {
  const [contacts, message, updateContact, createContact, deleteContact] = useContacts()
  const [newName, setNewName] = useState<string>('')
  const [newNumber, setNewNumber] = useState<string>('')
  const [filter, setFilter] = useState<string>('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (contacts.every(person => person.name !== newName)) {
      createContact({ name: newName, number: newNumber, id: "" })
      setNewName('')
      setNewNumber('')
    }
    else {
      const response = window.confirm(`${newName} is already in the phonebook, replace old phone number with new one`)
      if (response) {
        const contact = contacts.find(({ name }) => name === newName)
        if (contact)
          updateContact({ ...contact, number: newNumber })
      }
    }
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
    response && deleteContact(contact)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Message {...message} />}
      <Filter onChange={handleFilterChange} />
      <h2>Add new</h2>
      <AddContact newName={newName} newNumber={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={handleSubmit} />
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

export default App