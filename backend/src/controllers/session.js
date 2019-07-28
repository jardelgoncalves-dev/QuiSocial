import jwt from 'jsonwebtoken'
import Base from '../repository/base/repository-base'
import Validators from '../helpers/validators'
import { errorResponse, successResponse } from '../helpers/response-message'

export default class SessionController {
  constructor (Model) {
    this.Users = new Base(Model)
  }

  async store (params) {
    const { email, password } = params
    const _validators = new Validators({
      'email.required': email,
      'email.email': email,
      'password.required': password
    })

    if(_validators.hasError()) {
      return errorResponse(_validators.errors)
    }

    const res = await this.Users.getOne({ where: { email } })
    if (Object.keys(res.data).length === 0) {
      return errorResponse({ message: 'User not found!' }, 401)
    }

    const user = res.data

    if(!(await user.comparePassword(password))) {
      return errorResponse({ message: 'Email or password invalid!' }, 401)
    }

    const token = jwt.sign(user.id, process.env.APP_SECRET)
    return successResponse({
      token,
      user
    })
    
  }
}