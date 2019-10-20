import axios from 'axios'
import { useState, useEffect } from 'react'
const BASE_URL = 'http://localhost:3001/persons'

export function getContacts(): Promise<Contact[]> {
  return axios.get<Contact[]>(BASE_URL)
    .then(response => response.data)
}

export function putContact(contact: Contact): Promise<Contact> {
  return axios.put<Contact>(`${BASE_URL}/${contact.id}`, contact)
    .then(response => response.data)
}

export function postContact(contact: Contact): Promise<Contact> {
  return axios.post<Contact>(BASE_URL, contact)
    .then(response => response.data)
}

export function deleteContact(contact: Contact): Promise<Contact> {
  return axios.delete<Contact>(`${BASE_URL}/${contact.id}`)
    .then(response => response.data)
}

export function useContacts(): [Contact[], { message: string, error: boolean } | undefined, (contact: Contact) => void, (contact: Contact) => void, (contact: Contact) => void] {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [message, setMessage] = useState<{ message: string, error: boolean } | undefined>()
  const [editedContact, setEditedContact] = useState<Contact | undefined>()
  const [newContact, setNewContact] = useState<Contact | undefined>()
  const [deletedContact, setDeleteContact] = useState<Contact | undefined>()

  useEffect(() => {
    let hasCanceled = false

    getContacts()
      .then(responseContacts => {
        if (!hasCanceled)
          setContacts(responseContacts)
      })
      .catch(error => {
        if (hasCanceled)
          return
        if (error instanceof Error)
          setMessage({ message: error.message, error: true })
        else
          setMessage({ message: "unable to fetch contacts", error: true })
      })
    return () => { hasCanceled = true }
  }, [])

  useEffect(() => {
    let hasCanceled = false
    if (editedContact) {
      putContact(editedContact)
        .then(responseContact => {
          if (!hasCanceled) {
            setContacts(prev => [...prev.filter(({ id }) => id !== responseContact.id), responseContact])
            setEditedContact(undefined)
            setMessage({ message: `Updated contact ${responseContact.name}`, error: false })
          }
        })
        .catch(error => {
          if (hasCanceled)
            return
          if (error instanceof Error)
            setMessage({ message: error.message, error: true })
          else
            setMessage({ message: "unable to put contact", error: true })
        })
    }
    return () => { hasCanceled = true }
  }, [editedContact])

  useEffect(() => {
    let hasCanceled = false
    if (newContact)
      postContact(newContact)
        .then(responseContact => {
          if (!hasCanceled) {
            setContacts(prev => [...prev, responseContact])
            setNewContact(undefined)
            setMessage({ message: `Created contact ${responseContact.name}`, error: false })
          }
        })
        .catch(error => {
          if (hasCanceled)
            return
          if (error instanceof Error)
            setMessage({ message: error.message, error: true })
          else
            setMessage({ message: "unable to store new contact", error: true })
        })


    return () => { hasCanceled = true }
  }, [newContact])

  useEffect(() => {
    let hasCanceled = false
    if (deletedContact)
      deleteContact(deletedContact)
        .then(() => {
          if (!hasCanceled) {
            setContacts(prev => prev.filter(({ id }) => id !== deletedContact.id))
            setDeleteContact(undefined)
            setMessage({ message: `Deleted contact ${deletedContact.name}`, error: false })
          }
        })
        .catch(error => {
          if (!hasCanceled)
            setMessage({ message: `unable to delete contact ${deletedContact.name}`, error: true })
        })


    return () => { hasCanceled = true }
  }, [deletedContact])

  useEffect(() => {
    let hasCanceled = false
    if (message)
      setTimeout(() => !hasCanceled && setMessage(undefined), 5000)

    return () => { hasCanceled = true }
  }, [message])

  return [contacts, message, setEditedContact, setNewContact, setDeleteContact]
}
