import { Request } from 'express'
import { UserManager } from 'src/managers/User'
import { User } from '../entities/User'

export interface CrispoContext {
  req: Request & {
    user?: User
  }
  managers: {
    user: UserManager
  }
}
