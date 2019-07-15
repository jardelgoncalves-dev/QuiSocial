import express from 'express'

class App {
  constructor () {
    this.express = express()

    this.config()
    this.middlewares()
  }

  config () {
    this.express.set('port', 3000)
  }

  middlewares () {
    this.express.use(express.json())
  }
  
  routes () {}
}

export default new App().express