import { createConnection, getConnectionOptions } from 'typeorm'

export const createTypeormConn = async () => {
  const config = await getConnectionOptions(process.env.NODE_ENV)

  return createConnection({
    ...config,
    name: 'default',
  })
}
