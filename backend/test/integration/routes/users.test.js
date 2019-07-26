describe('Routes /users', () => {
  const Users = app.datasource.models.Users
  const Posts = app.datasource.models.Posts
  const Likes = app.datasource.models.Likes
  const userDefault = {
    id: 1,
    name: 'Fulano de Tal',
    email: 'fulano@gmail.com',
    password: 'test'
  }

  let token = jwt.sign(userDefault.id, APP_SECRET)

  beforeEach(done => {
    Likes.destroy({ where: {} })
      .then(() => Posts.destroy({ where: {} })
        .then(() => Users.destroy({ where: {} })
          .then(() => Users.create(userDefault)
            .then(() => {
              done()
            }))))
  })

  describe('Route GET /users', () => {
    it('should return an user', done => {
      request
        .get('/users')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(userDefault.id)
          expect(res.body.name).to.be.eql(userDefault.name)
          expect(res.body.email).to.be.eql(userDefault.email)
          done(err)
        })
    })
  })

  describe('Route POST /users', () => {
    it('should create an user', done => {
      const novoUser = {
        id: 2,
        name: 'Novo usuario',
        email: 'novo@email.com',
        password: 'novo test'
      }

      request
        .post('/users')
        .send(novoUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(novoUser.id)
          expect(res.body.name).to.be.eql(novoUser.name)
          expect(res.body.email).to.be.eql(novoUser.email)
          done(err)
        })
    })
  })

  describe('Route POST /users', () => {
    it('should return errors stating email and password not entered', done => {
      const novoUser = {
        id: 2,
        name: 'User com erros'
      }

      request
        .post('/users')
        .send(novoUser)
        .end((err, res) => {
          expect(res.body.error).to.have.a.property('email')
          expect(res.body.error).to.have.a.property('password')
          done(err)
        })
    })
  })

  describe('Route POST /users', () => {
    it('should return an error that email already has a record', done => {
      const novoUser = {
        id: 2,
        name: 'Novo usuario ',
        email: 'fulano@gmail.com',
        password: 'test fail'
      }

      request
        .post('/users')
        .send(novoUser)
        .end((err, res) => {
          expect(res.body.error).to.have.a.property('email')
          done(err)
        })
    })
  })

  describe('Route PUT /users', () => {
    it('should update an user', done => {
      const updateUser = {
        name: 'Update user',
        photoName: 'updateImage.png',
        bio: 'Minha bio atualizada'
      }

      request
        .put('/users')
        .set('authorization', `Bearer ${token}`)
        .send(updateUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(userDefault.id)
          expect(res.body.name).to.be.eql(updateUser.name)
          expect(res.body.email).to.be.eql(userDefault.email)
          expect(res.body.photoName).to.be.eql(updateUser.photoName)
          expect(res.body.bio).to.be.eql(updateUser.bio)
          done(err)
        })
    })
  })
})