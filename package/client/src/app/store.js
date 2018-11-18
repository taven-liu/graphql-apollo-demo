import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { preload, sagas } from './sagas'
import reducers from './reducers'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const middlewares = applyMiddleware(sagaMiddleware)

const store = createStore(
  reducers,
  composeWithDevTools(middlewares)
)
let tasks = sagaMiddleware.run(sagas)
sagaMiddleware.run(preload)

const onTasksException = () => {
  tasks.toPromise().catch(e => {
    tasks.cancel()
    tasks = sagaMiddleware.run(sagas)
    onTasksException()
  })
}
onTasksException()

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    tasks.cancel()
    tasks.toPromise().then(() => {
      tasks = sagaMiddleware.run(sagas)
    })
    store.replaceReducer(reducers)
  })
}

export { store, history }
