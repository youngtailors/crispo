import { Repository } from 'typeorm'
import { User } from '../entities/User'
import { UserRepository } from '../repositories/User'
import { AuthStrategy } from '../types/AuthStrategy'
import { NewUserDataInput } from '../modules/users/resolver'

export class UserManager {
  repository: Repository<User>

  authStrategy: AuthStrategy

  constructor(repository: UserRepository, authStrategy: AuthStrategy) {
    this.repository = repository
    this.authStrategy = authStrategy
  }

  login() {
    console.log('ahihi')
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
