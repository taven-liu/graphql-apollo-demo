import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import Root from 'app/root'
import { store } from 'app/store'
import client from 'app/client'
import 'antd/dist/antd.css'
import './index.css'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Component />
        </Provider>
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root)

if (module.hot) {
  module.hot.accept('app/root', () => {
    render(Root)
  })
}
