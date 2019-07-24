describe('Routes /users', () => {
  const Users = app.datasource.models.Users
  const userDefault = {
    id: 1,
    name: 'Fulano de Tal',
    email: 'fulano@gmail.com',
    password: 'test'
  }

  beforeEach(done => {
    Users.destroy({ where: {} })
      .then(() => Users.create(userDefault)
        .then(() => {
          done()
        }))
  })

  describe('Route GET /users', () => {
    it('should return a user lists', done => {
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(userDefault.id)
          expect(res.body[0].name).to.be.eql(userDefault.name)
          expect(res.body[0].email).to.be.eql(userDefault.email)
          done(err)
        })
    })
  })

  describe('Route GET /users/:id', () => {
    it('should return a user', done => {
      request
        .get('/users/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(userDefault.id)
          expect(res.body.name).to.be.eql(userDefault.name)
          expect(res.body.email).to.be.eql(userDefault.email)
          done(err)
        })
    })
  })

  describe('Route POST /users', () => {
    it('should create a user', done => {
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

  describe('Route PUT /users/:id', () => {
    it('should update a user', done => {
      const updateUser = {
        name: 'Update user',
        photoName: 'updateImage.png',
        bio: 'Minha bio atualizada'
      }

      request
        .put('/users/1')
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