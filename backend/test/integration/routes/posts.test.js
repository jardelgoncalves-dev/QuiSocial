describe('Routes /posts', () => {
  const Posts = app.datasource.models.Posts
  const Users = app.datasource.models.Users
  const Likes = app.datasource.models.Likes
  const userDefault = {
    id: 1,
    name: 'Jardel',
    email: 'jardel@example.com',
    password: 'test'
  } 
  const postDefault = {
    id: 1,
    content: 'Esse é um post default'
  }

  let token = jwt.sign(userDefault.id, APP_SECRET)

  beforeEach(done => {
    Likes.destroy({ where: {} })
      .then(() => Posts.destroy({ where: {} })
        .then(() => Users.destroy({ where: {} })
          .then(() => Users.create(userDefault)
            .then(() => Posts.create({
              id: 1,
              userId: 1,
              content: 'Esse é um post default'
            })
              .then(() => {
                done()
              })))))
  })

  describe('Route GET /posts', () => {
    it('should return a post lists', done => {
      request
      .get('/posts')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body[0].id).to.be.eql(postDefault.id)
        expect(res.body[0].content).to.be.eql(postDefault.content)
        done(err)
      })
    })
  })

  describe('Route GET /posts/:id', () => {
    it('should return a post', done => {
      request
      .get('/posts/1')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.id).to.be.eql(postDefault.id)
        expect(res.body.content).to.be.eql(postDefault.content)
        done(err)
      })
    })
  })

  describe('Route POST /posts', () => {
    it('should create a post', done => {
      const novoPost = {
        id: 2,
        content: 'Novo post'
      }

      request
      .post('/posts')
      .set('authorization', `Bearer ${token}`)
      .send(novoPost)
      .end((err, res) => {
        expect(res.body.id).to.be.eql(novoPost.id)
        expect(res.body.content).to.be.eql(novoPost.content)
        done(err)
      })
    })
  })

  describe('Route POST /posts', () => {
    it('should return an error because content is required', done => {
      const novoPost = {
        id: 2
      }

      request
      .post('/posts')
      .set('authorization', `Bearer ${token}`)
      .send(novoPost)
      .end((err, res) => {
        expect(res.body.error).to.have.a.property('content')
        expect(res.status).to.be.eql(400)
        done(err)
      })
    })
  })

  describe('Route PUT /posts/:id', () => {
    it('should update a post', done => {
      const updatedPost = {
        id: postDefault.id,
        content: 'Post is updated'
      }

      request
      .put('/posts/1')
      .set('authorization', `Bearer ${token}`)
      .send(updatedPost)
      .end((err, res) => {
        expect(res.body.id).to.be.eql(postDefault.id)
        expect(res.body.content).to.be.eql(updatedPost.content)
        done(err)
      })
    })
  })

  describe('Route DELETE /posts/:id', () => {
    it('should delete a post', done => {

      request
      .delete('/posts/1')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.eql(204)
        done(err)
      })
    })
  })

  describe('Route GET /posts/user/:id', () => {
    it('should return a post lists with an like lists', done => {
      request
      .get('/posts/user/1')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body[0]).to.have.a.property('Likes')
        done(err)
      })
    })
  })
})