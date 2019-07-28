import HttpStatus from 'http-status'
import { successResponse, errorResponse } from '../../helpers/response-message'

export default class RepositoryBase {
  constructor (Model) {
    this.Model = Model
  }

  async getAll (include) {
    const result = await this.Model.findAll({order: [['createdAt', 'DESC']], include })
    return successResponse(result)
  }

  async getAllByParams (params, include) {
    const result = await this.Model.findAll({ where: params, include })
    return successResponse(result)
  }

  async getOne (params) {
    const result = await this.Model.findOne({ where: params })
    return successResponse(result)
  }

  async create (data) {
    try {
      const result = await this.Model.create(data)
      return successResponse(result, HttpStatus.CREATED)
    } catch (err) {
      return errorResponse('Ocorreu um erro inesperado ao tentar salvar os dados!', HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async update (params, data) {
    try {
      const updated = await this.Model.update(data, { where: params })
      if (!updated[0] === 1) {
        return errorResponse('Ocorreu um erro ao tentar atualizar os dados, verifique as informações e tente novamente!', HttpStatus.BAD_REQUEST)
      }
      const result = await this.Model.findOne({ where: params })
      return successResponse(result)
    } catch (err) {
      return errorResponse('Ocorreu um erro inesperado ao tentar atualizar os dados!', HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async delete (params) {
    try{
      const result = this.Model.destroy({ where: params })
      return successResponse(result, HttpStatus.NO_CONTENT)
    } catch (err) {
      return errorResponse('Ocorreu um erro inesperado ao tentar remover os dados!', HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

}