import { Request } from 'express'
import { UserManager } from 'src/managers/User'

export interface CrispoContext {
  req: Request
  managers: {
    user: UserManager
  }
}
