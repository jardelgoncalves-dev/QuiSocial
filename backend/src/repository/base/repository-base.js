import HttpStatus from 'http-status'
import { successResponse, errorResponse } from '../../helpers/response-message'

export class RepositoryBase {
  constructor (Model) {
    this.Model = Model
  }

  getAll () {
    return this.Model.findAll()
      .then(result => successResponse(result))
      .catch(() => errorResponse('Ocorreu um erro inesperado. Contate o administrador!', HttpStatus.UNPROCESSABLE_ENTITY))
  }

  getOne (params) {
    return this.Model.findOne({ where: params })
      .then(result => successResponse(result))
      .catch(() => errorResponse('Ocorreu um erro inesperado. Contate o administrador!', HttpStatus.UNPROCESSABLE_ENTITY))
  }

  create (data) {
    return this.Model.create(data)
      .then(result => successResponse(result, HttpStatus.CREATED))
      .catch(() => errorResponse('Ocorreu um erro inesperado. Contate o administrador!', HttpStatus.UNPROCESSABLE_ENTITY))
  }

  update (params, data) {
    return this.Model.update(data, { where: params })
      .then(() => this.Model.findOne({ where: params })
        .then(result => successResponse(result))
      )
      .catch(() => errorResponse('Ocorreu um erro inesperado. Contate o administrador!', HttpStatus.UNPROCESSABLE_ENTITY))
  }

  delete (params) {
    return this.Model.update({ where: params })
      .then(result => successResponse(result, HttpStatus.NO_CONTENT))
      .catch(() => errorResponse('Ocorreu um erro inesperado. Contate o administrador!', HttpStatus.UNPROCESSABLE_ENTITY))
  }

}