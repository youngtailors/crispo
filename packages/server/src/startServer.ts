import { ApolloServer, ApolloError } from 'apollo-server-express'
import * as Express from 'express'
import { createTypeormConn } from './createTypeormConn'
import { buildSchema } from 'type-graphql'
import { GraphQLError } from 'graphql'
import { get } from 'lodash'
import { ValidationError } from 'class-validator'
import { formatError } from './utils/formatError'

export const startServer = async () => {
  const conn = await createTypeormConn()
  console.log(conn.name)

  const app = Express()

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/modules/**/resolver.*'],
    }),
    formatError: (error: GraphQLError) => {
      if (error.originalError instanceof ApolloError) {
        return error
      }

      const errors = get(
        error,
        'extensions.exception.validationErrors',
        [],
      ) as ValidationError[]

      return formatError(errors)
    },
  })

  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  )
}
