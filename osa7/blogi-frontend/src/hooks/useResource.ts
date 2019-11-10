import axios from 'axios'
import { useState, useEffect, useRef, useCallback } from 'react'

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
  const Authorization = getBearer()

  const cancelled = useRef(false)
  const [resource, setResource] = useState<T[]>([])
  const getResource = useCallback(async function getResource(): Promise<T[] | void> {
    if (Authorization) {
      const { data } = await axios.get<T[]>(url, { headers: { Authorization } })
      return data
    }
  }, [Authorization, url])

  async function create(res: N): Promise<void> {
    await axios.post(url, res, { headers: { Authorization } })
    const newRes = await getResource()
    if (!cancelled.current && newRes)
      setResource(newRes)
  }

  async function update(res: T): Promise<void> {
    await axios.put(`${url}/${res.id}`, res, { headers: { Authorization } })
    const newRes = await getResource()
    if (!cancelled.current && newRes)
      setResource(newRes)
  }

  async function remove(res: T): Promise<void> {
    await axios.delete(`${url}/${res.id}`, { headers: { Authorization } })
    const newRes = await getResource()
    if (!cancelled.current && newRes)
      setResource(newRes)
  }

  useEffect(() => {
    getResource()
      .then(res => {
        if (!cancelled.current && res)
          setResource(res)
      })
    return (): void => { cancelled.current = true }
  }, [Authorization, getResource])


  return [
    resource,
    { create, update, remove }
  ]
}
