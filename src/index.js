import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/index.scss'
import App from './App'

// Redux
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// Dev tools
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

document.getElementById('root').addEventListener('mousedown', function (event) {
  if (event.button === 1) {
    event.preventDefault()
  }
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
