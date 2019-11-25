/* eslint-disable indent */

const initial = null

export const setUser = (user) => {
  return ({
    type: 'SET_USER',
    data: {
      user
    }
  })
}

export const clearUser = () => {
  return ({
    type: 'CLEAR_USER'
  })
}

const userHandler = (state = initial, action) => {
  switch (action.type) {
    case 'SET_USER':
      return (
        action.data.user
      )
    case 'CLEAR_USER':
      return initial
    default:
      return state
  }
}

export default userHandler