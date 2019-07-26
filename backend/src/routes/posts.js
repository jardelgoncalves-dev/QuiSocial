import PostsController from '../controllers/posts'
import authMiddleware from '../middleware/auth'

export default (app) => {
  const Posts = app.datasource.models.Posts
  const _postsController = new PostsController(Posts)

  app.route('/posts')
    .all(authMiddleware)
    .get(async (req, res) => {
      const result = await _postsController.getAll()
      return res.status(result.status).json(result.data)
    })
    .post(async (req, res) => {
      const result = await _postsController.create(req.body)
      return res.status(result.status).json(result.data)
    })

  app.route('/posts/:id')
    .all(authMiddleware)
    .get(async (req, res) => {
      const { id } = req.params
      const result = await _postsController.getOne({ id })
      return res.status(result.status).json(result.data)
    })
    .put(async (req, res) => {
      const { id } = req.params
      const { content } = req.body
      const result = await _postsController.update({ id }, { content })
      return res.status(result.status).json(result.data)
    })
    .delete(async (req, res) => {
      const { id } = req.params
      const result = await _postsController.delete({ id })
      return res.status(result.status).send()
    })
}