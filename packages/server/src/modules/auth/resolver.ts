import { Resolver, Mutation, Arg, Ctx, Args } from 'type-graphql'
import { AuthResponse, NewUserDataInput, SignInArgs } from './typeDefs'
import { CrispoContext } from 'src/types/Context'

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthResponse)
  async signUp(
    @Arg('userData')
    userData: NewUserDataInput,
    @Ctx() { managers: { user: userManager } }: CrispoContext,
  ): Promise<AuthResponse> {
    try {
      const accessToken = await userManager.signUp(userData)
      return {
        access_token: accessToken,
      }
    } catch (e) {
      throw e
    }
  }

  @Mutation(() => AuthResponse)
  async signIn(
    @Args() { email, password }: SignInArgs,
    @Ctx() { managers: { user: userManager } }: CrispoContext,
  ): Promise<AuthResponse> {
    const accessToken = await userManager.login(email, password)
    return {
      access_token: accessToken,
    }
  }
}
