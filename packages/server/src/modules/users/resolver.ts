import { Resolver, Query, Mutation, Arg, InputType, Field } from 'type-graphql'
import { User } from '../../entities/User'
import { MaxLength, IsEmail, MinLength } from 'class-validator'

@InputType()
class NewUserDataInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @MinLength(6)
  @MaxLength(60)
  username: string

  @Field()
  @MinLength(6)
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
  async createUser(
    @Arg('userData')
    userData: NewUserDataInput,
  ): Promise<User | null> {
    try {
      const user = User.create(userData).save()
      return user
    } catch (e) {
      console.log(e)
    }

    return null
  }
}
