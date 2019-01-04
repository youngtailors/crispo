import { Resolver, Query } from 'type-graphql'
import { User } from '../../entities/User'

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Query(() => String)
  hello() {
    return 'baby'
  }
}
