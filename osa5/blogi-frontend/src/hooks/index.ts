import { useState } from 'react'

type UseFieldProperties = {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

export function useField(type: string): UseFieldProperties {
  const [value, setValue] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
    reset: (): void => setValue('')
  }
}