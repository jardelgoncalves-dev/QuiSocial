import Base from '../repository/base/repository-base'
import Validators from '../helpers/validators'
import { errorResponse } from '../helpers/response-message'

export default class PostsController {
  constructor (Model) {
    this.Posts = new Base(Model)
  }

  getAll () {
    return this.Posts.getAll()
  }

  getOne (params) {
    return this.Posts.getOne(params)
  }

  create (data) {
    const { content } = data
    const _validator = new Validators({
      'content.required': content
    })

    if (_validator.hasError()) {
      return errorResponse(_validator.errors)
    }

    return this.Posts.create(data)
  }

  update (params, data) {
    const { content } = data
    const _validator = new Validators({
      'content.required': content
    })

    if (_validator.hasError()) {
      return errorResponse(_validator.errors)
    }

    return this.Posts.update(params, data)
  }

  delete (params) {
    return this.Posts.delete(params)
  }
}