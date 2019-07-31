import express from 'express'
import io from 'socket.io'
import server from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import upload from 'express-fileupload'
import datasource from './config/datasource'
import UsersRoutes from './routes/users'
import PostsRoutes from './routes/posts'
import SessionRoutes from './routes/session'
import ClapsRoutes from './routes/claps'

dotenv.config({
  path: process.env.NODE_ENV !== 'test' ? '.env' : '.env.test'
})

class App {
  constructor () {
    this.express = express()
    this.server = server.Server(this.express)
    this.io = io(this.server)

    this.config()
    this.middlewares()
    this.routes()
  }

  config () {
    this.express.datasource = datasource(this.express)
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(upload())
    this.express.use((req, res, next) => {
      req.io = this.io
      return next()
    })
  }
  
  routes () {
    UsersRoutes(this.express)
    PostsRoutes(this.express)
    SessionRoutes(this.express)
    ClapsRoutes(this.express)
    this.express.use('/public/files', express.static(path.join(__dirname, '../public/files')));
  }
}


export default new App()