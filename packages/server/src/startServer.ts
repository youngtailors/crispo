import { ApolloServer, gql } from 'apollo-server-express'
import * as Express from 'express'
import { createTypeormConn } from './createTypeormConn'

export const startServer = async () => {
  const conn = await createTypeormConn()
  if (conn) {
    await conn.runMigrations()
  }

  const app = Express()

  // The GraphQL schema
  const typeDefs = gql`
    type Query {
      "A simple type for getting started!"
      hello: String
    }
  `

  // A map of functions which return data for the schema.
  const resolvers = {
    Query: {
      hello: () => 'crispo',
    },
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  )
}
