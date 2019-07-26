import SessionController from '../controllers/session'

export default (app) => {
  const Users = app.datasource.models.Users
  const _sessionController = new SessionController(Users)

  app.route('/session')
    .post(async(req, res) => {
      const { email, password } = req.body
      const result = await _sessionController.store({ email, password })
      return res.status(result.status).json(result.data)
    })
}