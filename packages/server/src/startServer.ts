import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { createTypeormConn } from './createTypeormConn'
import { buildSchema } from 'type-graphql'

export const startServer = async () => {
  const conn = await createTypeormConn()
  console.log(conn.name)

  const app = Express()

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/modules/**/resolver.*'],
    }),
  })

  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  )
}
