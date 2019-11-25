const testBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: '5dbcc3ba5353df363c53058d',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    user: '5dbcc1f6bb75c5324c1c4702',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    user: '5dbcc3ba5353df363c53058d',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    user: '5dbcc1f6bb75c5324c1c4702',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    user: '5dbcc135260efa5b14b6410c',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    user: '5dbcc1f6bb75c5324c1c4702',
    likes: 2,
    __v: 0
  }
]

const testUsers = [
  {
    _id: '5dbcc3ba5353df363c53058d',
    username: 'birdie',
    name: 'Dodo Bird',
    passwordHash: '$2b$10$j1DIxk1F7cPHDHWt6RtNme.cDCs6DNZja5H9VDbhiheZcoAALGlPW',
    __v: 0
  },
  {
    _id: '5dbcc1f6bb75c5324c1c4702',
    username: 'bob',
    name: 'BOB',
    passwordHash: '$2b$10$43EfuTQ0l9kGhqkTp7orTONMvXNrhxor/I.8z.u3nAEMA/TfBHQqm',
    __v: 0
  },
  {
    _id: '5dbcc135260efa5b14b6410c',
    username: 'mjkerminen',
    name: 'Markus Kerminen',
    passwordHash: '$2b$10$nJovZfXTTy65ml5aIYw8iOrLMh6Yht81iTO4RdZTMW9dUex7K4OJO',
    __v: 0
  },
]

module.exports = {
  testBlogs,
  testUsers
}