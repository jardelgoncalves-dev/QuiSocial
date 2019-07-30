import Sequelize from 'sequelize'
import Base from '../repository/base/repository-base'
import Validators from '../helpers/validators'
import { errorResponse, successResponse } from '../helpers/response-message'

export default class PostsController {
  constructor (PostModel, ClapsModel, UsersModel) {
    this.Posts = new Base(PostModel)
    this.ClapsModel = ClapsModel
    this.UsersModel = UsersModel
  }

  getAll () {
    const query = {
      order: [
        ['createdAt', 'DESC']
      ],
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('Claps.post_id')), 'claps']]
      },
      include: [
        {
          model: this.ClapsModel, attributes: []
        },
        {
          model: this.UsersModel,
          attributes: {
            exclude: ['password']
          }
        }
      ],
      group: ['Posts.id']
    }
    return this.Posts.getAll(query)
  }

  getAllByUser (params) {
    const query = {
      where: params,
      order: [
        ['createdAt', 'DESC']
      ],
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('Claps.post_id')), 'claps']]
      },
      include: [
        {
          model: this.ClapsModel, attributes: []
        }
      ],
      group: ['Posts.id']
    }

    return this.Posts.getAllByParams(query)
  }

  getOne (params) {
    const query = {
      where: params,
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('Claps.post_id')), 'claps']]
      },
      include: [
        {
          model: this.ClapsModel, attributes: []
        }
      ],
      group: ['Posts.id']
    }
    return this.Posts.getOne(query)
  }

  async create (data) {
    const { content } = data
    const _validator = new Validators({
      'content.required': content
    })

    if (_validator.hasError()) {
      return errorResponse(_validator.errors)
    }

    const created = await this.Posts.create(data)
    const query = {
      where: { id: created.data.id },
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('Claps.post_id')), 'claps']]
      },
      include: [
        {
          model: this.ClapsModel, attributes: []
        },
        {
          model: this.UsersModel,
          attributes: {
            exclude: ['password']
          }
        }
      ],
      group: ['Posts.id']
    }

    const post = await this.Posts.getOne(query)
    return successResponse(post.data, 201)

  }

  delete (params) {
    return this.Posts.delete({ where: params })
  }
}