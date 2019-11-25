/* eslint-disable indent */
import blogsService from '../services/blogs'

const initial = []

export const setBlogs = (blogs) => {
  return ({
    type: 'SET_BLOGS',
    data: {
      blogs
    }
  })
}

export const clearUsers = () => {
  return ({
    type: 'CLEAR_BLOGS'
  })
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

const usersHandler = (state = initial, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return (
        action.data.blogs
      )
    case 'CLEAR_BLOGS':
      return initial
    default:
      return state
  }
}

export default usersHandler