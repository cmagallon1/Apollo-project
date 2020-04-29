import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import injectStyles from "./styles";
import { typeDefs, resolvers } from './resolvers'
import gql from 'graphql-tag';
import Login from './pages/login';

const cache = new InMemoryCache();

const IS_LOGGED_IN = gql`
  query isLooggedIn {
    isLoggedIn @client
  }
`;

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    headers: { authorization: localStorage.getItem('token') },
    uri: 'http://localhost:4000/graphql',
  }),
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  }
});

function IsLoggedIn(){
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login/>;
}

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn/>
  </ApolloProvider>,
  document.getElementById("root")
);
