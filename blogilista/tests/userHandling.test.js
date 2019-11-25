const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.testUsers)
})

describe('HTTP POST to /api/users', () => {
  let testUser = {
    username: 'TESTUSER',
    name: 'TESTNAME',
    password: 'TESTPASS'
  }

  test('rejects post if username is missing', async () => {
    let usernameMissing = testUser
    delete usernameMissing.username

    const response = await api
      .post('/api/users')
      .send(usernameMissing)
      .expect(400)

    const dbAfter = await User.find({})

    expect(response.body.error).toContain('username')
    expect(dbAfter.length).toEqual(helper.testUsers.length)
  })

  test('rejects post if username isn\'t unique', async () => {
    let usernameNotUnique = testUser
    usernameNotUnique.username = 'bob'

    const response = await api
      .post('/api/users')
      .send(usernameNotUnique)
      .expect(400)

    const dbAfter = await User.find({})

    expect(response.body.error).toContain('unique')
    expect(dbAfter.length).toEqual(helper.testUsers.length)
  })

  test('rejects post if password is missing', async () => {
    let passwordMissing = testUser
    passwordMissing.username = 'TESTUSER'
    delete passwordMissing.password

    const response = await api
      .post('/api/users')
      .send(passwordMissing)
      .expect(400)

    const dbAfter = await User.find({})

    expect(response.body.error).toContain('password')
    expect(dbAfter.length).toEqual(helper.testUsers.length)
  })

  test('rejects post if password is less than 3 long', async () => {
    let passwordTooShort = testUser
    passwordTooShort.password = '13'

    const response = await api
      .post('/api/users')
      .send(passwordTooShort)
      .expect(400)

    const dbAfter = await User.find({})

    expect(response.body.error).toContain('3')
    expect(dbAfter.length).toEqual(helper.testUsers.length)
  })
})





afterAll(() => { mongoose.connection.close() })