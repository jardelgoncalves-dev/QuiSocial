import Base from '../repository/base/repository-base'
import Validators from '../helpers/validators'
import { errorResponse, successResponse } from '../helpers/response-message'

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

  getAllByPost (params) {
    return this.Likes.getAllByParams(params)
  }

  async create (data) {
    const { postId, userId } = data
    const _validators = new Validators({
      'postId.required': postId
    })

    if (_validators.hasError()) {
      return errorResponse(_validators.errors)
    }

    const exists = await this.Likes.getOne({ postId, userId })
    if (Object.keys(exists.data).length !== 0) {
      return successResponse({ success: 'Informação ja existe na base de dados' }, 202)
    }

    return this.Likes.create(data)
  }

  delete (params) {
    return this.Likes.delete(params)
  }
}