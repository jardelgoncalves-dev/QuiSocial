import express from 'express'

import datasource from './config/datasource'

class App {
  constructor () {
    this.express = express()

    this.config()
    this.middlewares()
  }

  config () {
    this.express.set('port', 3000)
    this.express.datasource = datasource(this.express)
  }

  middlewares () {
    this.express.use(express.json())
  }
  
  routes () {}
}

export default new App().express