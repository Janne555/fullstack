import React from 'react'
import { StoreType } from '..'

const Notification = ({ store }: { store: StoreType }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {store.getState().notification}
    </div>
  )
}

export default Notification