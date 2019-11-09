import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChange: (e: React.ChangeEvent<HTMLInputElement>): void => { dispatch(setFilter(e.target.value)) }
  }
}

const Filter = ({ onChange }: ReturnType<typeof mapDispatchToProps>) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={onChange} />
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Filter)