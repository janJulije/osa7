import React from 'react'
import { render } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'

describe('SimpleBlog component', () => {
  const testBlog = {
    title: 'TITLE',
    author: 'AUTHOR',
    likes: 5
  }

  test('renders title', () => {
    const component = render(
      <SimpleBlog blog={testBlog} />
    )

    expect(component.container).toHaveTextContent(
      'TITLE'
    )
  })

  test('renders author', () => {
    const component = render(
      <SimpleBlog blog={testBlog} />
    )

    expect(component.container).toHaveTextContent(
      'AUTHOR'
    )
  })
  test('renders likes', () => {
    const component = render(
      <SimpleBlog blog={testBlog} />
    )

    expect(component.container).toHaveTextContent(
      '5'
    )
  })
})