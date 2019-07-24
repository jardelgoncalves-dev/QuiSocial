import Base from '../repository/base/repository-base'
import Validators from '../helpers/validators'
import { errorResponse } from '../helpers/response-message';

export default class UsersController {
  constructor (model) {
    this.Users = new Base(model)
  }

  getOne (params) {
    return this.Users.getOne(params)
  }

  getAll () {
    return this.Users.getAll()
  }

  async create (data) {
    const { name, email, password } = data
    const _validator = new Validators({
      'name.required': name,
      'password.required': password,
      'email.required': email,
      'email.email': email
    })

    const checkEmail = await this.Users.getOne({ email })
    if (checkEmail) {
      if (Array.isArray(_validator.errors.email)) {
        _validators.errors.email.push('This email already has a registration')
      } else {
        _validators.errors.email = ['This email already has a registration']
      }
    }

    if(_validator.hasError()) {
      return errorResponse(_validator.errors)
    }

    return this.Users.create(data)
  }

  update (params, data) {
    const result = this.Users.update(params, data)
    return result
  }

  delete (params) {
    const result = this.Users.delete(params)
    return result
  }
}