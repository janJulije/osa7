const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  let users = await User
    .find({})
    .populate('blogs', { title: true, author: true, url: true })
  users = users.map(user => user.toJSON())

  response.status(200).json(users)
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (body.password && body.password.length < 3) {
      return response.status(400).json({ error: 'the length of the password needs to be at least 3' })
    }

    let passwordHash = undefined

    if (body.password) {
      const saltRounds = 10
      passwordHash = await bcrypt.hash(body.password, saltRounds)
    }

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash,
      blogs: []
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exeption) {
    next(exeption)
  }
})

module.exports = usersRouter