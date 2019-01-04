import { Resolver, Query, Ctx } from 'type-graphql'
import { User } from '../../entities/User'
import { CrispoContext } from 'src/types/Context'

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: CrispoContext) {
    const { user } = req
    return user
  }
}
