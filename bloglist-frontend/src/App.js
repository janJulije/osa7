import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { useField } from './hooks/index'
import './styles.css'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UserLoggedIn from './components/UserLoggedIn'
import Blogs from './components/Blogs'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import Message from './components/Message'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import { showMessageFor } from './reducers/messageReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs, setBlogs } from './reducers/blogsReducer'
import { connect } from 'react-redux'

function App(props) {
  const username = useField('text')
  const password = useField('password')

  const initBlogs = props.initializeBlogs
  useEffect(() => {
    initBlogs()
  }, [initBlogs])

  const initUsers = props.initializeUsers
  useEffect(() => {
    initUsers()
  }, [initUsers])

  const setU = props.setUser
  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'))
    if (userFromStorage) {
      setU(userFromStorage)
      blogService.setToken(userFromStorage.token)
    }
  }, [setU])

  const userById = (id) =>
    props.users.find(user => user.id === id)

  const blogById = (id) =>
    props.blogs.find(blog => blog.id === id)

  const showMessage = (message, type) => {
    props.showMessageFor(message, type, 3)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login(username.value, password.value)

      props.setUser(user)
      blogService.setToken(user.token)
      username.reset()
      password.reset()
      localStorage.setItem('user', JSON.stringify(user))
      showMessage(`Logged in succesfully as ${user.username}`, 'success')
    } catch (exception) {
      showMessage('Invalid username or password', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    showMessage('Logged out succesfully', 'success')
    localStorage.removeItem('user')
    props.setUser(null)
  }

  const handleLike = async (blog) => {
    const returnedBlog = await blogService.likeBlog(blog)
    let blogsAfter = [...props.blogs].map(b => b.id === returnedBlog.id ? returnedBlog : b)
    blogsAfter.sort((a, b) => b.likes - a.likes)
    props.setBlogs(blogsAfter)
    showMessage(`Liked blog ${blog.title} by ${blog.author} `, 'success')
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author} from the list`)) {
      await blogService.deleteBlog(blog)
      props.setBlogs(props.blogs.filter(b => b.id !== blog.id))
      showMessage(`Removed blog ${blog.title} by ${blog.author} `, 'success')
    }
  }

  const loginScreen = () => (
    <div>
      <h1 className='top'>log in to application</h1>

      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
      />
    </div>
  )

  const blogScreen = () => (
    <div>
      <Togglable buttonLabel='add blog'>
        <CreateBlog
          showMessage={showMessage}
        />
      </Togglable>

      <p> </p>

      <Blogs
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
    </div>
  )

  if (props.user === null) {
    return (
      loginScreen()
    )
  } else {
    return (
      <div>
        <Router>
          <div>
            <Message />

            <div className="top">
              <h1 className='inline'>Bloglog</h1>
              <Link to="/blogs" className='topLink'>blogs</Link>
              <Link to="/users" className='topLink'>users</Link>
            </div>

            <UserLoggedIn handleLogout={handleLogout} />

            <Route exact path="/" render={() => <Redirect to="/blogs" />} />

            <Route exact path="/blogs" render={() => blogScreen()} />
            <Route path="/blogs/:id" render={({ match }) =>
              <SingleBlog blog={blogById(match.params.id)} handleLike={handleLike} handleDelete={handleDelete} />
            } />

            <Route exact path="/users" render={() => <Users />} />
            <Route path="/users/:id" render={({ match }) =>
              <SingleUser user={userById(match.params.id)} />
            } />
          </div>
        </Router>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  {
    showMessageFor,
    setUser, clearUser,
    initializeUsers,
    initializeBlogs, setBlogs
  }
)(App)