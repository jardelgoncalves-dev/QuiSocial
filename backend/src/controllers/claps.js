import Base from '../repository/base/repository-base'
import Validators from '../helpers/validators'
import { errorResponse, successResponse } from '../helpers/response-message'

export default class ClapsController {
  constructor (Model, Posts) {
    this.Model = Model
    this.Claps = new Base(Model)
    this.Posts = new Base(Posts)
  }

  async create (data) {
    const { postId, userId } = data
    const _validators = new Validators({
      'postId.required': postId
    })

    if (_validators.hasError()) {
      return errorResponse(_validators.errors)
    }

    return this.Claps.create(data)
  }
}