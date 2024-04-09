const { typeDefs, resolvers } = require('./Schemas');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static assets from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Use the authMiddleware function to check for and decode JWTs
    return authMiddleware({ req });
  },
});

async function startApolloServer() {
  await server.start();

  app.use('/graphql', expressMiddleware(server, { context: async ({ req }) => ({ req }) }));

  db.once('open', () => {
    // This route handles any requests that don't match the ones above
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
