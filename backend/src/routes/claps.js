import ClapsController from '../controllers/claps'
import authMiddleware from '../middleware/auth'

export default (app) => {
  const Claps = app.datasource.models.Claps
  const Posts = app.datasource.models.Posts
  const Users = app.datasource.models.Users
  const _clapsController = new ClapsController(Claps, Posts, Users)

  app.route('/claps')
    .all(authMiddleware)
    .post(async(req, res) => {
      req.body.userId = req.userId
      const result = await _clapsController.create(req.body)

      if (result.status === 201) {
        req.io.emit('claps', result.data)
      }
      
      return res.status(result.status).json(result.data)
    })
}