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

export function deleteContact(id: number): Promise<Contact> {
  return axios.delete<Contact>(`${BASE_URL}/${id}`)
    .then(response => response.data)
}

export function useContacts(): [Contact[], string | undefined, (contact: Contact) => void, (contact: Contact) => void, (id: number) => void] {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [error, setError] = useState<string | undefined>()
  const [editedContact, setEditedContact] = useState<Contact | undefined>()
  const [newContact, setNewContact] = useState<Contact | undefined>()
  const [deletedContactId, setDeleteContactId] = useState<number | undefined>()

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
          setError(error.message)
        else
          setError("unable to fetch contacts")
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
          }
        })
        .catch(error => {
          if (hasCanceled)
            return
          if (error instanceof Error)
            setError(error.message)
          else
            setError("unable to put contact")
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
          }
        })
        .catch(error => {
          if (hasCanceled)
            return
          if (error instanceof Error)
            setError(error.message)
          else
            setError("unable to store new contact")
        })


    return () => { hasCanceled = true }
  }, [newContact])

  useEffect(() => {
    let hasCanceled = false
    if (deletedContactId)
      deleteContact(deletedContactId)
        .then(() => {
          if (!hasCanceled) {
            setContacts(prev => prev.filter(({ id }) => id !== deletedContactId))
            setDeleteContactId(undefined)
          }
        })
        .catch(error => {
          if (hasCanceled)
            return
          if (error instanceof Error)
            setError(error.message)
          else
            setError("unable to store new contact")
        })


    return () => { hasCanceled = true }
  }, [deletedContactId])

  return [contacts, error, setEditedContact, setNewContact, setDeleteContactId]
}
