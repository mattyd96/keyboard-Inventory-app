import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';

// add token to headers if it exists
const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
});

// link for graph ql
// use below commented link for local development use
// https://keyboard-project-server.herokuapp.com/
const link = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

// set up uri for queries
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
});

function Apollo() {
  return (
    <ApolloProvider  client={client}>
      <App />
    </ApolloProvider>
  );
}

export default Apollo;