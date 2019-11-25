import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const Blogs = (props) => {
  const mappedBlogs = props.blogs.map(blog => <Blog blog={blog} key={blog.title} handleLike={props.handleLike} handleDelete={props.handleDelete} user={props.user} />)

  return (
    <div>
      {mappedBlogs}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(mapStateToProps)(Blogs)