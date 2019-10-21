import React from 'react'


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
          <li key={id}>{name}, {number}, <button onClick={() => onDelete({ name, number, id })}>delete</button></li>
        ))}
  </ul>
)

export default List