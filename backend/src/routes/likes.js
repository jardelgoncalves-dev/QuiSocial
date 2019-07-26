import LikesController from '../controllers/likes'

export default (app) => {
  const Likes = app.datasource.models.Likes
  const _likesController = new LikesController(Likes)

  app.route('/likes')
    .get(async(req, res) => {
      const result = await _likesController.getAll()
      return res.status(result.status).json(result.data)
    })
    .post(async(req, res) => {
      const result = await _likesController.create(req.body)
      return res.status(result.status).json(result.data)
    })

  app.route('/likes/:id')
    .get(async(req, res) => {
      const { id } = req.params
      const result = await _likesController.getOne({ id })
      return res.status(result.status).json(result.data)
    })
    .delete(async(req, res) => {
      const { id } = req.params
      const result = await _likesController.delete({ id })
      return res.status(result.status).send()
    })
}