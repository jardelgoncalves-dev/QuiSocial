import PostsController from '../controllers/posts'
import authMiddleware from '../middleware/auth'

export default (app) => {
  const Posts = app.datasource.models.Posts
  const Claps = app.datasource.models.Claps
  const Users = app.datasource.models.Users
  const _postsController = new PostsController(Posts, Claps, Users)

  app.route('/posts')
    .all(authMiddleware)
    .get(async (req, res) => {
      const result = await _postsController.getAll()
      return res.status(result.status).json(result.data)
    })
    .post(async (req, res) => {
      req.body.userId = req.userId
      const result = await _postsController.create(req.body)
      if (result.status === 201) {
        req.io.emit('post', result.data)
      }

      return res.status(result.status).json(result.data)
    })

  app.route('/posts/:id')
    .all(authMiddleware)
    .delete(async (req, res) => {
      const { id } = req.params
      const result = await _postsController.delete({ id, userId: req.userId  })
      return res.status(result.status).send()
    })
  
  app.route('/posts/user/:id')
    .all(authMiddleware)
    .get(async (req, res) => {
      const { id } = req.params
      const result = await _postsController.getAllByUser({ userId: id})
      return res.status(result.status).json(result.data)
    })
}