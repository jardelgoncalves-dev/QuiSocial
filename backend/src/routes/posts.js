import PostsController from '../controllers/posts'

export default (app) => {
  const Posts = app.datasource.models.Posts
  const _postsController = new PostsController(Posts)

  app.route('/posts')
    .get(async (req, res) => {
      const result = await _postsController.getAll()
      return res.status(result.status).json(result.data)
    })

  app.route('/posts/:id')
    .get(async (req, res) => {
      const { id } = req.params
      const result = await _postsController.getOne({ id })
      return res.status(result.status).json(result.data)
    })
}