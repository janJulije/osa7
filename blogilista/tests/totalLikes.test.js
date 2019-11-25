const totalLikes = require('../utils/list_helper').totalLikes

describe('totalLikes', () => {
  test('returns correct with one blog', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    expect(totalLikes(blogs)).toBe(5)
  })

  test('returns correct with many blogs', () => {
    const blogs = [{ likes: 0 }, { likes: 4 }, { likes: 10 }]

    expect(totalLikes(blogs)).toBe(14)
  })

  test('returns correct with no blogs', () => {
    const blogs = []

    expect(totalLikes(blogs)).toBe(0)
  })
})