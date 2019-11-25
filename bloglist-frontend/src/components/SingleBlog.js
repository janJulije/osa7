import React from 'react'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogsReducer'
import { withRouter } from 'react-router-dom'

const SingleBlog = (props) => {
  const comment = useField('text')
  const blog = props.blog

  if (!blog) {
    return null
  }

  const handleComment = async () => {
    if (!comment.value) {
      return
    }

    const returnedBlog = await blogService.addComment(blog, comment.value)
    let blogsAfter = [...props.blogs].map(b => b.id === returnedBlog.id ? returnedBlog : b)
    blogsAfter.sort((a, b) => b.likes - a.likes)
    props.setBlogs(blogsAfter)
    comment.reset()
  }

  const deleteButton = () => {
    if (props.user && blog.user.username === props.user.username) {
      return (
        <button className='cancelButton' onClick={() => props.handleDelete(blog)}>remove</button>
      )
    }
  }

  const handleBack = () => (
    props.history.push('/blogs')
  )

  let comments = <p>Blog doesn&#39;t have any comment yet</p>
  if (blog.comments && blog.comments[0]) {
    comments = <ul>{blog.comments.map(comment => <li key={Math.random()}>{comment}</li>)}</ul>
  }

  return (
    <div className='blog'>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} like(s) <button id='like' onClick={() => props.handleLike(blog)}>like</button> <br />
      added by {blog.user.name} <br />
      {deleteButton()}
      <h3>comments</h3>
      <input {...comment} reset={null} ></input>
      <button onClick={() => handleComment()}>add comment</button>
      {comments}
      <button onClick={() => handleBack()}>back</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { setBlogs }
)(withRouter(SingleBlog))