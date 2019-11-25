/* eslint-disable indent */

let timeout = null

const initial = {
  content: '',
  style: 'success'
}

export const setMessage = (content, style) => {
  return ({
    type: 'SET_MESSAGE',
    data: {
      content,
      style
    }
  })
}

export const clearMessage = () => {
  return ({
    type: 'CLEAR_MESSAGE'
  })
}

export const showMessageFor = (content, style, seconds) => {
  return async dispatch => {
    dispatch(setMessage(content, style))
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(clearMessage())
    }, 1000 * seconds)
  }
}

const messageHandler = (state = initial, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        content: action.data.content,
        style: action.data.style,
        timer: state.timer
      }
    case 'CLEAR_MESSAGE':
      return initial
    default:
      return state
  }
}

export default messageHandler