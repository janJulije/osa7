import React from 'react'
import { useField } from '../hooks/index'
import blogsService from '../services/blogs'
import { connect } from 'react-redux'
import { setBlogs } from '../reducers/blogsReducer'

const CreateBlog = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      if (title.value !== '' && author.value !== '' && url.value !== '') {
        const blog = {
          title: title.value,
          author: author.value,
          url: url.value
        }

        const returnedBlog = await blogsService.createBlog(blog)
        title.reset()
        author.reset()
        url.reset()
        props.showMessage(`Added ${returnedBlog.title} by ${returnedBlog.author}`, 'success')
        props.setBlogs(props.blogs.concat(returnedBlog))
      }
    } catch (exception) {
      props.showMessage(`${exception}`, 'error')
      console.log(exception)
    }
  }

  return (
    <div>
      <table>
        <th>Add blog</th>
        <tr>
          <td>title:</td>
          <td><input
            {...title} reset={null} id='title'
            placeholder='Blog about stuff'>
          </input></td>
        </tr>
        <tr>
          <td>author:</td>
          <td><input
            {...author} reset={null} id='author'
            placeholder='Blog Creator'>
          </input></td>
        </tr>
        <tr>
          <td>url:</td>
          <td><input
            {...url} reset={null} id='url'
            placeholder='https://www.adress.com'>
          </input></td>
        </tr>
      </table>

      <button type='submit' id='add' onClick={handleCreateBlog}>add</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    content: state.message.content,
    style: state.message.style,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { setBlogs }
)(CreateBlog)