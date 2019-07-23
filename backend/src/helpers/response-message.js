import HttpStatus from 'http-status'

const successResponse = (data, status = HttpStatus.OK) => ({ data: data || {}, status })

const errorResponse = (message, status = HttpStatus.BAD_REQUEST) => ({ data: { error: message }, status })

export {
  successResponse,
  errorResponse
}