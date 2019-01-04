import * as jwt from 'jsonwebtoken'
import { AuthStrategy } from '../types/AuthStrategy'
import { User } from '../entities/User'
import { UserRepository } from '../repositories/User'

export class JWTAuthentication implements AuthStrategy {
  repository: UserRepository
  secret: string
  expiresIn: number

  constructor(repository: UserRepository, expiresIn = 3600) {
    this.repository = repository
    this.secret = process.env.SECRET_KEY as string
    this.expiresIn = expiresIn
  }

  async validate(token: string) {
    try {
      const decode: any = jwt.verify(token, this.secret)
      const user = await this.repository.findOneOrFail({
        id: decode.id,
        version: decode.version,
      })
      return user
    } catch (err) {
      throw new Error('Token verification error')
    }
  }

  authenticate(user: User) {
    if (!user || (user && (!user.id || !user.version))) {
      throw new Error('Invalid user to sign a token')
    }
    return jwt.sign({ id: user.id, version: user.version }, this.secret, {
      expiresIn: this.expiresIn,
    })
  }
}
