import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'
import React, { useState } from 'react'
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

const Menu = ({ anecdotes, addNew, anecdoteById, notification, setNotification }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/'>anecdotes</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
            <Link style={padding} to='/create'>create new</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
            <Link style={padding} to='/about'>about</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {!(notification.length === 0) && <Alert variant='success'>{notification}</Alert>}

      <Route path='/anecdotes/:id' render={({ match }) => <Anecdote anecdote={anecdoteById(match.params.id)} />} />
      <Route exact path='/' render={() => <AnecdoteList anecdotes={anecdotes} anecdoteById={anecdoteById} />} />
      <Route path='/create' render={() => <CreateNew addNew={addNew} setNotification={setNotification} />} />
      <Route path='/about' render={() => <About />} />
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote => {
          return (
            <tr key={anecdote.id}>
              <td>
                <Link to={`/anecdotes/${anecdote.id}`} >{anecdote.content}</Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes </p>
    <p>for more info see {anecdote.info} </p>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is 'a story with a point.'</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => {
  const style = {
    marginTop: 10,
    padding: 5,
    backgroundColor: 'lightblue'
  }
  return (
    <div style={style}>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
  )
}

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const [created, setCreated] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.setNotification(`a new anecdote ${content} created`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)
    setCreated(true)
  }

  if (created) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control type='text' name='content' value={content} onChange={(e) => setContent(e.target.value)} />

          <Form.Label>author</Form.Label>
          <Form.Control type='text' name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />

          <Form.Label>url for more info</Form.Label>
          <Form.Control type='text' name='info' value={info} onChange={(e) => setInfo(e.target.value)} />

          <Button variant='primary' type='submit' to='/'>create</Button>
        </Form.Group>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => {
    console.log(id)
    return anecdotes.find(a => a.id === id)
  }

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className='container'>
      <Router>
        <div>
          <h1>Software anecdotes</h1>
          <Menu
            anecdotes={anecdotes}
            addNew={addNew}
            anecdoteById={anecdoteById}
            notification={notification}
            setNotification={setNotification}
          />
        </div>
      </Router>
      <Footer />
    </div>
  )
}

export default App;