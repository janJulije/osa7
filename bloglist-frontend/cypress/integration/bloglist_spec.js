describe('Bloglist', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  it('login page can be opened', function () {
    cy.contains('log in')
  })

  it('login with incorrect username and password is unsuccesful', function () {
    cy.get('#username')
      .type('sdftyguhijok')

    cy.get('#password')
      .type('sdftyguhijok')

    cy.contains('login')
      .click()

    cy.contains('login')
  })

  it('login with correct username and password is succesful', function () {
    cy.get('#username')
      .type('mluukkai')

    cy.get('#password')
      .type('salainen')

    cy.contains('login')
      .click()

    cy.contains('Bloglog')
  })
})

describe('Bloglist', function () {
  before(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')

    cy.get('#username')
      .type('mluukkai')

    cy.get('#password')
      .type('salainen')

    cy.contains('login')
      .click()
  })

  it('blog can be added', function () {
    cy.contains('add blog')
      .click()
    cy.get('#title')
      .type('title')
    cy.get('#author')
      .type('author')
    cy.get('#url')
      .type('https://www.sdfghjk.com')
    cy.get('#add')
      .click()

    cy.contains('author: title')
  })

  it('blog can be liked', function () {
    cy.contains('author: title')
      .click()
    cy.get('#like')
      .click()

    cy.contains('1 like(s)')
  })

  it('blog can be deleted', function () {
    cy.contains('remove')
      .click()

    cy.contains('Removed')
  })

  it('users can be viewed', function () {
    cy.contains('users')
      .click()

    cy.contains('Matti Luukkainen')
  })
})