require('dotenv-safe').config()
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  name: process.env.NODE_ENV,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`src/entities/*.ts`],
  subscribers: [`src/subscribers/*.ts`],
  migrations: [`src/migrations/*.ts`],
  synchronize: !isProd,
  logging: !isProd,
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
}
