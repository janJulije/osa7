/* eslint-disable indent */
import usersService from '../services/users'

const initial = []

export const setUsers = (users) => {
  return ({
    type: 'SET_USERS',
    data: {
      users
    }
  })
}

export const clearUsers = () => {
  return ({
    type: 'CLEAR_USERS'
  })
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

const usersHandler = (state = initial, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return (
        action.data.users
      )
    case 'CLEAR_USERS':
      return initial
    default:
      return state
  }
}

export default usersHandler