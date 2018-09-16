import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers/index'

export default function configureStore () {
  const history = createHistory()
  const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
  )

  return {store, history}
}
