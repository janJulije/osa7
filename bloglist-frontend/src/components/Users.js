import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = (props) => {
  const users = props.users
  const usersTable = users.map(user =>
    <tr key={user.username}>
      <th><Link className='link' to={`/users/${user.id}`}>{user.name}</Link></th>
      <th>{user.blogs.length}</th>
    </tr>
  )

  return (
    <div className='blog'>
      <h2>Users</h2>
      <table>
        <tbody>
          {usersTable}
        </tbody>
      </table>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)