import React from 'react'
import { connect } from 'react-redux'

const Message = (props) => {
  if (props.content === '') {
    return (
      null
    )
  } else {
    return (
      <div className={props.style}>
        <p id='messageText'>
          {props.content}
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.message.content,
    style: state.message.style
  }
}

export default connect(mapStateToProps)(Message)