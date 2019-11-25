import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import blogsReducer from './reducers/blogsReducer'
import App from './App'

import PromisePolyfill from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

const reducer = combineReducers({
  message: messageReducer,
  user: userReducer,
  users: usersReducer,
  blogs: blogsReducer
})

let store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render((
  <Provider store={store} >
    <App id='app' />
  </Provider>
), document.getElementById('root'))