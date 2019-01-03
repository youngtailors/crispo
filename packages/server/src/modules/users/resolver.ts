import { Resolver, Query, Mutation, Arg, InputType, Field } from 'type-graphql'
import { User } from '../../entities/User'
import { MaxLength } from 'class-validator'

@InputType()
class NewUserDataInput implements Partial<User> {
  @Field()
  @MaxLength(50)
  username: string

  @Field()
  @MaxLength(100)
  password: string
}

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Query(() => String)
  hello() {
    return 'baby'
  }

  @Mutation(() => User)
  async createUser(@Arg('userData')
  {
    username,
    password,
  }: NewUserDataInput): Promise<User | null> {
    try {
      const user = User.create({
        username,
        password,
      }).save()
      return user
    } catch (e) {
      console.log(e)
    }

    return null
  }
}
