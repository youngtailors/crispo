import 'reflect-metadata'

// Load environment variable
import * as Dotenv from 'dotenv-safe'
Dotenv.config()

import { startServer } from './startServer'

startServer().catch(e => {
  console.log(e)
})
