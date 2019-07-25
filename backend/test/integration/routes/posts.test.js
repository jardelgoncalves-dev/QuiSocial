describe('Routes /posts', () => {
  const Posts = app.datasource.models.Posts
  const Users = app.datasource.models.Users
  const userDefault = {
    id: 1,
    name: 'Jardel',
    email: 'jardel@example.com',
    password: 'test'
  } 
  const postDefault = {
    id: 1,
    userId: 1,
    content: 'Esse é um post default'
  }

  beforeEach(done => {
    Posts.destroy({ where: {} })
      .then(() => Users.destroy({ where: {} })
        .then(() => Users.create(userDefault)
          .then(() => Posts.create(postDefault)
            .then(() => {
              done()
            }))))
  })

  describe('Route GET /posts', () => {
    it('should return a post lists', done => {
      request
      .get('/posts')
      .end((err, res) => {
        expect(res.body[0].id).to.be.eql(postDefault.id)
        expect(res.body[0].content).to.be.eql(postDefault.content)
        done(err)
      })
    })
  })
})