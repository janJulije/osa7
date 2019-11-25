import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('Blogs component', () => {
  const testBlog = {
    title: 'TITLE',
    author: 'AUTHOR',
    likes: 5,
    url: 'http://www.fullstacopen.com',
    user: {
      name: 'USER',
      username: 'USERNAME'
    }
  }

  const mockLikeHandler = jest.fn()

  test('likeHandler is called twice when the blog is liked twice', () => {
    const component = render(
      <Blog blog={testBlog} handleLike={mockLikeHandler} />
    )

    fireEvent.click(component.container.querySelector(('.blog')))

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeHandler.mock.calls.length).toBe(2)
  })

  test('only shows name and author by default', () => {
    const component = render(
      <Blog blog={testBlog} />
    )

    expect(component.container).toHaveTextContent(
      'TITLE'
    )
    expect(component.container).toHaveTextContent(
      'AUTHOR'
    )
    expect(component.container).not.toHaveTextContent(
      'http://www.fullstacopen.com'
    )
  })

  test('shows likes, url and user when enlarged', () => {
    const component = render(
      <Blog blog={testBlog} />
    )

    fireEvent.click(component.container.querySelector(('.blog')))

    expect(component.container).toHaveTextContent(
      testBlog.url
    )
    expect(component.container).toHaveTextContent(
      testBlog.likes
    )
    expect(component.container).toHaveTextContent(
      testBlog.user.name
    )
  })
})