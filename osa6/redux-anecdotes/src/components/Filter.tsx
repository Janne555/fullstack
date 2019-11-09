import React from 'react'
import { StoreType } from '../index'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ store }: { store: StoreType }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    store.dispatch(setFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter