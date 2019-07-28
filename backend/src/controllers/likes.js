import Base from '../repository/base/repository-base'
import Validators from '../helpers/validators'
import { errorResponse, successResponse } from '../helpers/response-message'

export default class LikesController {
  constructor (Model, Posts) {
    this.Model = Model
    this.Likes = new Base(Model)
    this.Posts = new Base(Posts)
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

    const createdLike = await this.Likes.create(data)
    const posts = await this.Posts.getAllByParams({ id: createdLike.data.postId }, [{ model: this.Model }])

    return successResponse(posts.data[0], 201)
  }

  delete (params) {
    return this.Likes.delete(params)
  }
}