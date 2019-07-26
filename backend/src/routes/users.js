import UsersController from '../controllers/users'
import authMiddleware from '../middleware/auth'

export default (app) => {
  const Users = app.datasource.models.Users
  const _usersController = new UsersController(Users)

  app.route('/users')
    .post(async (req, res) => {
      const result = await _usersController.create(req.body)
      return res.status(result.status).json(result.data)
    })


  app.route('/users')
    .all(authMiddleware)
    .get(async (req, res) => {
      const id = req.userId
      const result = await _usersController.getOne({ id })
      return res.status(result.status).json(result.data)
    })
    .put(async (req, res) => {
      const id = req.userId
      const result = await _usersController.update({ id }, req.body)
      return res.status(result.status).json(result.data)
    })
}