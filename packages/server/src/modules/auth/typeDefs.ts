import { ObjectType, Field, InputType } from 'type-graphql'
import { IsEmail, MinLength, MaxLength } from 'class-validator'
import { User } from '../../entities/User'

@ObjectType()
export class SignInResponse {
  @Field()
  access_token: string
}

@InputType()
export class NewUserDataInput implements Partial<User> {
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
