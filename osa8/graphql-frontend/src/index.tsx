import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from '@apollo/react-hooks'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: { reconnect: true }
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    if ("operation" in definition)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    return false
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
