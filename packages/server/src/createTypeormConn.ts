import { createConnection } from 'typeorm'

export const createTypeormConn = async () => {
  return createConnection()
}
