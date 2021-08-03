import React from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import {Nav} from './Components'
import {Home, Detail, NoMatch, Login, Signup, OrderHistory, Success} from './Pages'
import {StoreProvider} from './utils/context'


const httpLink = createHttpLink({
  uri: '/graphql'
})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/products/:id" component={Detail} />
              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
