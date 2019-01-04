import { ApolloServer, ApolloError } from 'apollo-server-express'
import * as Express from 'express'
import { createTypeormConn } from './createTypeormConn'
import { buildSchema } from 'type-graphql'
import { GraphQLError } from 'graphql'
import { get } from 'lodash'
import { v4 } from 'uuid'
import { ValidationError } from 'class-validator'
import { formatError } from './utils/formatError'
import { CrispoContext } from './types/Context'
import { UserManager } from './managers/User'
import { JWTAuthentication } from './utils/jwt'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from './repositories/User'

export const startServer = async () => {
  const conn = await createTypeormConn()
  console.log(conn.name)

  const app = Express()

  const userRepository = getCustomRepository(UserRepository)
  const authStrategy = new JWTAuthentication(userRepository)

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/modules/**/resolver.*'],
    }),
    context: ({ req }: any): CrispoContext => ({
      req,
      managers: {
        user: new UserManager(userRepository, authStrategy),
      },
    }),
    formatError: (error: GraphQLError) => {
      if (error.originalError instanceof ApolloError) {
        return error
      }

      const errors = get(
        error,
        'extensions.exception.validationErrors',
        null,
      ) as ValidationError[]

      if (errors) {
        return formatError(errors)
      }

      const id = v4()
      console.error(error)
      return new GraphQLError(`Internal server error: ${id}`)
    },
  })

  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  )
}
