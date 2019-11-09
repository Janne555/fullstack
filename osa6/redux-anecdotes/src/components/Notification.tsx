import React from 'react'
import { StateType } from '../store'
import { connect } from 'react-redux'

const mapStateToProps = (state: StateType) => {
  return {
    notification: state.notification
  }
}

const Notification = ({ notification }: ReturnType<typeof mapStateToProps>) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return notification ? (
    <div style={style}>
      {notification}
    </div>
  )
    :
    null
}

export default connect(mapStateToProps)(Notification)