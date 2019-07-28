import Claps from "../../../src/routes/claps";

describe('Routes /claps', () => {
  const Claps = app.datasource.models.Claps
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

  const clapDefault = {
    id: 1,
    postId: postDefault.id
  }

  let token = jwt.sign(userDefault.id, APP_SECRET)
  
  beforeEach(done => {
    Claps.destroy({ where: {} })
      .then(() => Posts.destroy({ where: {} })
        .then(() => Users.destroy({ where: {} })
          .then(() => Users.create(userDefault)
            .then(() => Posts.create(postDefault)
              .then(() => Claps.create({
                id: 1,
                userId: userDefault.id,
                postId: postDefault.id
              })
                .then(() => {
                  done()
                }))))))
  })

  describe('Route POST /claps', () => {
    it('should return an error, postId is required', done => {
      request
        .post('/claps')
        .send({
          userId: userDefault.id
        })
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body.error).to.have.a.property('postId')
          done(err)
        })
    })
  })

  describe('Route POST /claps', () => {
    it('should create a like', done => {
      Users.create({
        name: 'new name',
        email: 'name@admin.com',
        password: '123'
      })
        .then(user => {
          let novoToken = jwt.sign(user.id, APP_SECRET)
          request
            .post('/claps')
            .set('authorization', `Bearer ${novoToken}`)
            .send({
              postId: postDefault.id
            })
            .end((err, res) => {
              expect(res.status).to.be.eql(201)
              done(err)
            })
        })
    })
  })
  
})