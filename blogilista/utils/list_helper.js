// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  blogs = blogs.map(blog => blog.likes)

  const total = blogs.reduce((acc, current) => {
    return acc + current
  }, 0)

  return total
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  let favorite = {}

  blogs.forEach(blog => {
    if (blog.likes >= mostLikes) {
      favorite = blog
      mostLikes = blog.likes
    }
  })

  return favorite
}

const mostBlogs = (blogs) => {
  let authors = new Map()

  blogs.forEach(blog => {
    if (authors.has(blog.author)) {
      authors.set(blog.author, authors.get(blog.author) + 1)
    } else {
      authors.set(blog.author, 1)
    }
  })

  let most = 0
  let authorWithMost = ''
  if (authors.size !== 0) {
    Array.from(authors.keys()).forEach(author => {
      if (authors.get(author) >= most) {
        authorWithMost = author
        most = authors.get(author)
      }
    })
  }

  const re = {
    author: authorWithMost,
    blogs: most
  }

  return re
}

const mostLikes = (blogs) => {
  let authors = new Map()

  blogs.forEach(blog => {
    if (authors.has(blog.author)) {
      authors.set(blog.author, authors.get(blog.author) + blog.likes)
    } else {
      authors.set(blog.author, blog.likes)
    }
  })

  let most = 0
  let authorWithMost = ''
  if (authors.size !== 0) {
    Array.from(authors.keys()).forEach(author => {
      if (authors.get(author) >= most) {
        authorWithMost = author
        most = authors.get(author)
      }
    })
  }

  const re = {
    author: authorWithMost,
    likes: most
  }

  return re
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}