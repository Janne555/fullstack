import axios from 'axios'
import { useState, useEffect } from 'react'

type UseResourceProperties<T, N> = [
  T[],
  {
    create: (res: N) => Promise<void>;
    update: (res: T) => Promise<void>;
    remove: (res: T) => Promise<void>;
  }
]

function getBearer(): string | undefined {
  const token = window.localStorage.getItem('token')
  return token ? `Bearer ${token}` : undefined
}

export function useResource<T extends { id: string }, N>(url: string): UseResourceProperties<T, N> {
  let cancelled = false

  const [resource, setResource] = useState<T[]>([])

  const Authorization = getBearer()

  async function getResource(): Promise<T[] | void> {
    if (Authorization) {
      const { data } = await axios.get<T[]>(url, { headers: { Authorization } })
      return data
    }
  }

  async function create(res: N): Promise<void> {
    await axios.post(url, res, { headers: { Authorization } })
    const newRes = await getResource()
    if (!cancelled && newRes)
      setResource(newRes)
  }

  async function update(res: T): Promise<void> {
    await axios.put(`${url}/${res.id}`, res, { headers: { Authorization } })
    const newRes = await getResource()
    if (!cancelled && newRes)
      setResource(newRes)
  }

  async function remove(res: T): Promise<void> {
    await axios.delete(`${url}/${res.id}`, { headers: { Authorization } })
    const newRes = await getResource()
    if (!cancelled && newRes)
      setResource(newRes)
  }


  useEffect(() => {
    getResource()
      .then(res => {
        if (!cancelled && res)
          setResource(res)
      })
    return (): void => { cancelled = true }
  }, [Authorization])


  return [
    resource,
    { create, update, remove }
  ]
}
