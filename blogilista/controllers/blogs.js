const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  let blogs = await Blog
    .find({})
    .populate('user', { name: true, username: true })
  blogs = blogs.map(blog => blog.toJSON())

  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  let blog = new Blog(request.body)

  const token = request.token

  try {
    const tokenUser = jwt.verify(token, process.env.SECRET)
    if (!token || !tokenUser.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(tokenUser.id)
    blog.user = user._id

    if (!blog.likes) {
      blog.likes = 0
    }

    if (blog.title && blog.author) {
      const result = await blog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()

      let b = await Blog
        .findOne(result)
        .populate('user', { name: true, username: true })

      response.status(201).json(b)
    } else {
      response.status(400).end()
    }
  } catch (exception) {
    console.log(exception)
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const token = request.token

  try {
    const tokenUser = jwt.verify(token, process.env.SECRET)
    if (!token || !tokenUser.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(tokenUser.id)
    const blog = await Blog.findById(request.params.id)

    if (user._id.toString() === blog.user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).json({ error: 'blog created by another user' })
    }
  } catch (exception) {
    console.log(exception)
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const update = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    comments: request.body.comments
  }

  const updated = await Blog
    .findByIdAndUpdate(request.params.id, update, { new: true })

  let b = await Blog
    .findOne(updated)
    .populate('user', { name: true, username: true })

  response.status(200).json(b.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const update = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    comments: request.body.comments
  }

  const updated = await Blog
    .findByIdAndUpdate(request.params.id, update, { new: true })

  let b = await Blog
    .findOne(updated)
    .populate('user', { name: true, username: true })

  response.status(200).json(b.toJSON())
})

module.exports = blogsRouter