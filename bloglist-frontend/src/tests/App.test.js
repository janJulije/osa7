import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'

import App from '../App'

describe('<App />', () => {
  test('if no user logged in, only the login screen is shown', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).not.toHaveTextContent(
      'React patterns'
    )
    expect(component.container).not.toHaveTextContent(
      'Edsger W. Dijkstra'
    )
    expect(component.container).not.toHaveTextContent(
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
    )
    expect(component.container).not.toHaveTextContent(
      'add blog'
    )
    expect(component.container).toHaveTextContent(
      'login'
    )
  })

  test('when a user is logged in, blogs are shown', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('user', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('logout')
    )

    expect(component.container).toHaveTextContent(
      'React patterns'
    )
    expect(component.container).toHaveTextContent(
      'Edsger W. Dijkstra'
    )
    expect(component.container).toHaveTextContent(
      'add blog'
    )
    expect(component.container).not.toHaveTextContent(
      'login'
    )
  })
})
