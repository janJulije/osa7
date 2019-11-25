import React from 'react'
import { withRouter } from 'react-router-dom'

const SingleUser = (props) => {
  if (!props.user) {
    return null
  }
  const user = props.user

  let userBlogs = <p>User has yet to add any blogs</p>
  if (user.blogs[0]) {
    userBlogs = <ul>{user.blogs.map(blog => <li key={blog.title}>{blog.title}</li>)}</ul>
  }

  const handleBack = () => (
    props.history.push('/users')
  )

  return (
    <div className='blog'>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {userBlogs}
      <button onClick={() => handleBack()}>back</button>
    </div>
  )
}

export default withRouter(SingleUser)