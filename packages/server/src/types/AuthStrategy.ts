import { User } from '../entities/User'

export interface AuthStrategy {
  authenticate: (user: User) => string
  validate: (token: string) => User | Promise<User>
}
