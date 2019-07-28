import HttpStatus from 'http-status'
import { successResponse, errorResponse } from '../../helpers/response-message'

export default class RepositoryBase {
  constructor (Model) {
    this.Model = Model
  }

  async getAll (query) {
    const result = await this.Model.findAll(query)
    return successResponse(result)
  }

  async getAllByParams (query) {
    const result = await this.Model.findAll(query)
    return successResponse(result)
  }

  async getOne (query) {
    const result = await this.Model.findOne(query)
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

  async update (query, data) {
    try {
      const updated = await this.Model.update(data, query)
      if (!updated[0] === 1) {
        return errorResponse('Ocorreu um erro ao tentar atualizar os dados, verifique as informações e tente novamente!', HttpStatus.BAD_REQUEST)
      }
      const result = await this.Model.findOne(query)
      return successResponse(result)
    } catch (err) {
      return errorResponse('Ocorreu um erro inesperado ao tentar atualizar os dados!', HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async delete (query) {
    try{
      const result = this.Model.destroy(query)
      return successResponse(result, HttpStatus.NO_CONTENT)
    } catch (err) {
      return errorResponse('Ocorreu um erro inesperado ao tentar remover os dados!', HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

}