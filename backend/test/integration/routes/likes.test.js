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

  describe('Route GET /likes/:id', () => {
    it('should return a like', done => {
      request
        .get('/likes/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(likeDefault.id)
          expect(res.body.userId).to.be.eql(userDefault.id)
          expect(res.body.postId).to.be.eql(postDefault.id)
          done(err)
        })
    })
  })

  describe('Route POST /likes', () => {
    it('should return code 202 for repeated postId and userId', done => {
      request
        .post('/likes')
        .send({
          postId: postDefault.id,
          userId: userDefault.id
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(202)
          done(err)
        })
    })
  })

  describe('Route POST /likes', () => {
    it('should return an error, postId is required', done => {
      request
        .post('/likes')
        .send({
          userId: userDefault.id
        })
        .end((err, res) => {
          expect(res.body.error).to.have.a.property('postId')
          done(err)
        })
    })
  })

  describe('Route POST /likes', () => {
    it('should create a like', done => {
      Users.create({
        name: 'new name',
        email: 'name@admin.com',
        password: '123'
      })
        .then(user => {
          request
            .post('/likes')
            .send({
              postId: postDefault.id,
              userId: user.id
            })
            .end((err, res) => {
              expect(res.body.userId).to.be.eql(user.id)
              expect(res.body.postId).to.be.eql(postDefault.id)
              done(err)
            })
        })
    })
  })

  describe('Route DELETE /likes/:id', () => {
    it('should delete a like', done => {
      request
        .delete('/likes/1')
        .end((err, res) => {
          expect(res.status).to.be.eql(204)
          done(err)
        })
    })
  })
})