describe('Routes /session', () => {
  const Users = app.datasource.models.Users
  const Posts = app.datasource.models.Posts
  const userDefault = {
    name: 'jardel',
    email: 'jardel@example.com',
    password: 'test'
  }

  beforeEach(done => {
    Posts.destroy({ where: {} })
      .then(() => Users.destroy({ where: {} })
        .then(() => Users.create(userDefault)
          .then(() => {
            done()
          })))
  })

  describe('Route POST /session', () => {
    it('should autheticate an user', done => {
      request
        .post('/session')
        .send({
          email: userDefault.email,
          password: userDefault.password
        })
        .end((err, res) => {
          expect(res.body).to.have.a.property('user')
          expect(res.body).to.have.a.property('token')
          done(err)
        })
    })
  })

  describe('Route POST /session', () => {
    it('should fail authentication, password is required', done => {
      request
        .post('/session')
        .send({
          email: userDefault.email
        })
        .end((err, res) => {
          expect(res.body.error).to.have.a.property('password')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })
  })

  describe('Route POST /session', () => {
    it('should fail authentication, email is required', done => {
      request
        .post('/session')
        .send({
          password: userDefault.password
        })
        .end((err, res) => {
          expect(res.body.error).to.have.a.property('email')
          expect(res.status).to.be.eql(400)
          done(err)
        })
    })
  })

  describe('Route POST /session', () => {
    it('should fail authentication, password invalid', done => {
      request
        .post('/session')
        .send({
          email: userDefault.email,
          password: 'is_invalid'
        })
        .end((err, res) => {
          expect(res.body.error).to.have.a.property('message')
          expect(res.status).to.be.eql(401)
          done(err)
        })
    })
  })

  describe('Route POST /session', () => {
    it('should fail authentication, email invalid', done => {
      request
        .post('/session')
        .send({
          email: 'email@isInvalid.com',
          password: userDefault.password
        })
        .end((err, res) => {
          expect(res.body.error).to.have.a.property('message')
          expect(res.status).to.be.eql(401)
          done(err)
        })
    })
  })
})