import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { SignInResponse, NewUserDataInput } from './typeDefs'
import { CrispoContext } from 'src/types/Context'

@Resolver()
export class AuthResolver {
  @Mutation(() => SignInResponse)
  async signIn(
    @Arg('userData')
    userData: NewUserDataInput,
    @Ctx() { managers: { user: userManager } }: CrispoContext,
  ): Promise<SignInResponse> {
    try {
      const accessToken = await userManager.signUp(userData)
      return {
        access_token: accessToken,
      }
    } catch (e) {
      throw e
    }
  }
}
