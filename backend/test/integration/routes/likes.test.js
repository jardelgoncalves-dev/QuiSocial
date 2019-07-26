import likes from "../../../src/routes/likes";

describe('Routes /likes', () => {
  const Likes = app.datasource.models.Likes
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
    userId: userDefault.id,
    content: 'new post'
  }

  const likeDefault = {
    id: 1,
    userId: userDefault.id,
    postId: postDefault.id
  }
  
  beforeEach(done => {
    Likes.destroy({ where: {} })
      .then(() => Posts.destroy({ where: {} })
        .then(() => Users.destroy({ where: {} })
          .then(() => Users.create(userDefault)
            .then(() => Posts.create(postDefault)
              .then(() => Likes.create(likeDefault)
                .then(() => {
                  done()
                }))))))
  })

  describe('Route GET /likes', () => {
    it('should return a like list', done => {
      request
        .get('/likes')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(likeDefault.id)
          expect(res.body[0].userId).to.be.eql(userDefault.id)
          expect(res.body[0].postId).to.be.eql(postDefault.id)
          done(err)
        })
    })
  })
})