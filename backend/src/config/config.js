import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV !== 'test' ? '.env' : '.env.test'
})

export default {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  params: {
    storage: 'db_test.sqlite',
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT || 'postgres',
    logging: false,
    define: {
      underscored: true
    }
  }
}