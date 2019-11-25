import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const likeBlog = async (blog) => {
  const changedBlog = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, changedBlog)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const addComment = async (blog, comment) => {
  let changedBlog

  if (blog.comments) {
    changedBlog = {
      ...blog,
      comments: blog.comments.concat(comment)
    }
  } else {
    changedBlog = {
      ...blog,
      comments: [].concat(comment)
    }
  }

  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, changedBlog)
  return response.data
}

export default {
  getAll,
  createBlog,
  setToken,
  likeBlog,
  deleteBlog,
  addComment
}