import LikesController from '../controllers/likes'
import authMiddleware from '../middleware/auth'

export default (app) => {
  const Likes = app.datasource.models.Likes
  const _likesController = new LikesController(Likes)

  app.route('/likes')
    .all(authMiddleware)
    .get(async(req, res) => {
      const result = await _likesController.getAll()
      return res.status(result.status).json(result.data)
    })
    .post(async(req, res) => {
      req.body.userId = req.userId
      const result = await _likesController.create(req.body)
      return res.status(result.status).json(result.data)
    })

  app.route('/likes/:id')
    .all(authMiddleware)
    .get(async(req, res) => {
      const { id } = req.params
      const result = await _likesController.getOne({ id })
      return res.status(result.status).json(result.data)
    })
    .delete(async(req, res) => {
      const userId = req.userId
      const { id } = req.params
      const result = await _likesController.delete({ id, userId })
      return res.status(result.status).send()
    })

  app.route('/likes/post/:id')
    .all(authMiddleware)
    .get(async(req, res) => {
      const { id } = req.params
      const result = await _likesController.getAllByPost({ postId: id })
      return res.status(result.status).json(result.data)
    })
}