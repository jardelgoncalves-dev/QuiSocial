import UsersController from '../controllers/users'

export default (app) => {
  const Users = app.datasource.models.Users
  const _usersController = new UsersController(Users)

  app.route('/users')
    .get( async (req, res) => {
      const result = await _usersController.getAll()
      return res.status(result.status).json(result.data)
    })
}