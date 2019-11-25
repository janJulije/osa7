import axios from 'axios'
const loginUrl = '/api/login'

const login = async (username, password) => {
  const response = await axios.post(loginUrl, { username, password })
  return response.data
}

export default { login }