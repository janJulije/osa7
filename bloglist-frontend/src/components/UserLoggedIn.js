import React from 'react'
import { connect } from 'react-redux'

const UserLoggedIn = ({ user, handleLogout }) => (
  <div>
    <p>
      {user.name} logged in
      <button className='cancelButton' type='submit' onClick={handleLogout}>logout</button>
    </p>
  </div>
)

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps)(UserLoggedIn)