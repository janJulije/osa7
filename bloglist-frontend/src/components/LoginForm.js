import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleLogin }) => (
  <div className='blog'>
    <p>
      username
      <input {...username} reset={null} className='textField' id='username' >
      </input>
    </p>
    <p>
      password
      <input {...password} reset={null} className='textField' id='password' >
      </input>
    </p>
    <button type='submit' onClick={handleLogin}>login</button>
  </div>
)

LoginForm.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm