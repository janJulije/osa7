import '@testing-library/jest-dom/extend-expect'

jest.mock('./services/blogs')

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => {
    if(savedItems[key]) {
      return savedItems[key]
    } else {
      return null
    }
  },
  clear: savedItems = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

