const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.testBlogs)
  await User.deleteMany({})
  await User.insertMany(helper.testUsers)
})

describe('HTTP GET to /api/blogs', () => {
  test('returns application/json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns right amount of stuff', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(6)
  })

  test('returns a blog that has a field called id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('HTTP POST to /api/blogs', () => {
  const testBlog = {
    title: 'Lorem ipsum',
    author: 'Genghis Khan',
    url: 'https://address.com/',
    likes: 1
  }

  test('icreases the amount of blogs with one', async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: helper.testUsers[0].username,
        password: 'Bone'
      })

    const token = response.body.token

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await api.get('/api/blogs')

    expect(blogsAfterPost.body.length).toBe(helper.testBlogs.length + 1)
  })

  test('adds the right blog', async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: helper.testUsers[0].username,
        password: 'Bone'
      })

    const token = response.body.token

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await api.get('/api/blogs')
    const bl = blogsAfterPost.body

    // eslint-disable-next-line no-unused-vars
    const ml = bl.map(({ id, user, ...rest }) => rest)

    expect(ml).toContainEqual(testBlog)
  })

  test('sets likes to 0 if not provided', async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: helper.testUsers[0].username,
        password: 'Bone'
      })

    const token = response.body.token

    const likesMissing = {
      title: 'gold',
      author: 'EDEN',
      url: 'https://interwebs.com/'
    }

    const addedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(likesMissing)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(addedBlog.body.likes).toEqual(0)
  })

  test('rejects post if title is missing', async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: helper.testUsers[0].username,
        password: 'Bone'
      })

    const token = response.body.token

    const titleMissing = {
      author: 'Notch',
      url: 'https://minceraft.com/',
      likes: 1000000000
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(titleMissing)
      .expect(400)

    const blogsAfterPost = await api.get('/api/blogs')

    expect(blogsAfterPost.body.length).toEqual(helper.testBlogs.length)
  })

  test('rejects post if author is missing', async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: helper.testUsers[0].username,
        password: 'Bone'
      })

    const token = response.body.token

    const authorMissing = {
      title: 'Notch',
      url: 'https://twitter.com/',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(authorMissing)
      .expect(400)

    const blogsAfterPost = await api.get('/api/blogs')

    expect(blogsAfterPost.body.length).toEqual(helper.testBlogs.length)
  })
})

describe('HTTP DELETE to /api/blogs/:id', () => {
  test('removes one blog', async () => {
    const initialDb = await api.get('/api/blogs')

    const idPresent = initialDb.body[0].id

    const response = await api
      .post('/api/login')
      .send({
        username: helper.testUsers[0].username,
        password: 'Bone'
      })

    const token = response.body.token

    await api
      .delete(`/api/blogs/${idPresent}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const afterDeletion = await api.get('/api/blogs')
    expect(afterDeletion.body.length).toBe(initialDb.body.length - 1)
  })
})

describe('HTTP PUT to /api/blogs/:id', () => {
  const changedBlog = {
    title: 'Still alive',
    author: 'GLaDOS',
    url: 'http://www.portal.com',
    user: '5dbcc3ba5353df363c53058d',
    likes: 3
  }

  test('doesn\'t change the number of blogs', async () => {
    const initialDb = await api.get('/api/blogs')
    const idPresent = initialDb.body[0].id

    await api
      .put(`/api/blogs/${idPresent}`)
      .send(changedBlog)
      .expect(200)

    const afterDeletion = await api.get('/api/blogs')
    expect(afterDeletion.body.length).toBe(initialDb.body.length)
  })

  test('puts the changed item on the database', async () => {
    const initialDb = await api.get('/api/blogs')
    const idPresent = initialDb.body[0].id

    await api
      .put(`/api/blogs/${idPresent}`)
      .send(changedBlog)
      .expect(200)

    const after = await api.get('/api/blogs')

    // eslint-disable-next-line no-unused-vars
    const blogsAfterChange = after.body.map(({ id, ...rest }) => rest)
    expect(blogsAfterChange)
  })

  test('responds correctly', async () => {
    const initialDb = await api.get('/api/blogs')
    const idPresent = initialDb.body[0].id

    const response = await api
      .put(`/api/blogs/${idPresent}`)
      .send(changedBlog)
      .expect(200)

    let returnedBlog = response.body
    delete returnedBlog.id

    expect(returnedBlog).toEqual(changedBlog)
  })
})

afterAll(() => {
  mongoose.connection.close()
})