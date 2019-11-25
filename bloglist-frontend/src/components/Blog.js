import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [showFull, setShowFull] = useState(false)

  const toggleShowFull = () => {
    setShowFull(!showFull)
  }

  const deleteButton = () => {
    if (user && blog.user.username === user.username) {
      return (
        <button className='cancelButton' onClick={() => handleDelete(blog)}>remove</button>
      )
    }
  }

  if (showFull) {
    return (
      <div className={'blog'}>
        <div onClick={toggleShowFull}>
          {blog.author}: {blog.title}
        </div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>
          added by {blog.user.name}
        </div>
        {deleteButton()}
      </div>
    )
  } else {
    return (
      <div onClick={toggleShowFull} className={'blog'}>
        <Link className='link' to={`/blogs/${blog.id}`}>{blog.author}: {blog.title}</Link>
      </div>
    )
  }
}

export default Blog