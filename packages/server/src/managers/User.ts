import { UserRepository } from '../repositories/User'
import { AuthStrategy } from '../types/AuthStrategy'
import { NewUserDataInput } from '../modules/auth/typeDefs'

export class UserManager {
  repository: UserRepository

  authStrategy: AuthStrategy

  constructor(repository: UserRepository, authStrategy: AuthStrategy) {
    this.repository = repository
    this.authStrategy = authStrategy
  }

  async login(email: string, password: string) {
    let user
    try {
      user = await this.repository.findByEmail(email)
    } catch (e) {
      throw e
    }
    const checkPass = user.verifyPassword(password)
    if (!checkPass) {
      throw new Error('Wrong username or password')
    }
    return this.authStrategy.authenticate(user)
  }

  async signUp(newUserData: NewUserDataInput): Promise<string> {
    try {
      const user = this.repository.create(newUserData)
      await this.repository.save(user)
      return this.authStrategy.authenticate(user)
    } catch (e) {
      console.log(`Signup error: ${e}`)
      return '1'
    }
  }
}
