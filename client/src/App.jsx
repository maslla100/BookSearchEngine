import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './apolloClient'; // Make sure the path is correct

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
