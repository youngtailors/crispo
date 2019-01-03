import 'reflect-metadata'
import * as Pino from 'pino'

// Load environment variable
import * as Dotenv from 'dotenv-safe'
Dotenv.config()

import { startServer } from './startServer'

const logger = Pino()

startServer().catch(e => {
  logger.error(e)
})
