import supertest from 'supertest'
import { expect } from 'chai'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import app from '../../src/app'

dotenv.config({
  path: process.env.NODE_ENV !== 'test' ? '.env' : '.env.test'
})

global.app = app
global.request = supertest(app)
global.expect = expect
global.APP_SECRET = process.env.APP_SECRET
global.jwt = jwt