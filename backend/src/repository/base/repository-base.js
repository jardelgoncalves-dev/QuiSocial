import HttpStatus from 'http-status'
import { successResponse, errorResponse } from '../../helpers/response-message'

export default class RepositoryBase {
  constructor (Model) {
    this.Model = Model
  }

  async getAll () {
    const result = await this.Model.findAll()
    return successResponse(result)
  }

  async getOne (params) {
    const result = await this.Model.findOne({ where: params })
    return successResponse(result)
  }

  async create (data) {
    try {
      const result = await this.Model.create(data)
      return successResponse(result)
    } catch (err) {
      return errorResponse('Ocorreu um erro inesperado ao tentar salvar os dados!', HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async update (params, data) {
    try {
      const result = await this.Model.update(data, { where: params })
      if (!result[0] === 1) {
        return errorResponse('Ocorreu um erro ao tentar atualizar os dados, verifique as informações e tente novamente!', HttpStatus.BAD_REQUEST)
      }
      return await this.Model.findOne(params)
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