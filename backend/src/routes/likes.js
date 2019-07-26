import LikesController from '../controllers/likes'

export default (app) => {
  const Likes = app.datasource.models.Likes
  const _likesController = new LikesController(Likes)

  app.route('/likes')
    .get(async(req, res) => {
      const result = await _likesController.getAll()
      return res.status(result.status).json(result.data)
    })
}