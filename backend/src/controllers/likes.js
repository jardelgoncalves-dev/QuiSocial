import Base from '../repository/base/repository-base'
import Validators from '../helpers/validators'
import { errorResponse } from '../helpers/response-message'

export default class LikesController {
  constructor (Model) {
    this.Likes = new Base(Model)
  }

  getAll () {
    return this.Likes.getAll()
  }

  getOne (params) {
    return this.Likes.getOne(params)
  }

  create (data) {
    const { postId } = data
    const _validators = new Validators({
      'postId.required': postId
    })

    if (_validators.hasError()) {
      return errorResponse(_validators.errors)
    }

    return this.Likes.create(data)
  }

  update (params, data) {
    const { postId } = data
    const _validators = new Validators({
      'postId.required': postId
    })

    if (_validators.hasError()) {
      return errorResponse(_validators.errors)
    }

    return this.Likes.update(params, data)
  }

  delete (params) {
    return this.Likes.delete(params)
  }
}