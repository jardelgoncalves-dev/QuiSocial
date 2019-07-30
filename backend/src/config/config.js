import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV !== 'test' ? '.env' : '.env.test'
})

export default {
  database: '',
  username: '',
  password: '',
  params: {
    storage: process.env.DB_STORAGE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    define: {
      underscored: true
    }
  }
}