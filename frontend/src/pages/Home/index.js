import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import socket from 'socket.io-client'
import { withContext } from '../../AppContext'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import UserCard from '../../components/Card/UserInfo'
import CardMenu from '../../components/Card/CardMenu'
import Container from '../../components/Container'
import Row from '../../components/Row'
import Col from '../../components/Col'
import TextareaPub from '../../components/TextareaPub'
import CardPub from '../../components/Card/CardPub'
import Pen from '../../components/Icons/Pen'
import Person from '../../components/Icons/Person'

class Home extends Component {

  state = {
    contentPost: '',
    posts: []
  }

  componentDidMount() {
    this.subscribeToEvent()
    this.getPosts()
  }

  subscribeToEvent = () => {
    const io = socket('http://localhost:3003')

    io.on('post', data => {
      this.setState({ posts: [ data, ...this.state.posts ] })
    })

    io.on('clap', data => {
      this.setState({ posts: this.state.posts.map(post => (
        post.id === data.id ? data : post
      )) })
    })
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  savePost = () => {
    const { contentPost } = this.state
    if (contentPost) {
      api.post('/posts', { content: contentPost })
        .catch(err => {
          console.log('Err', err.message)
        })
      this.setState({ contentPost: '' })
    }
  }

  getPosts = () => {
    api.get('/posts')
      .then(result => {
        this.setState({ posts: result.data })
      })
      .catch(err => {
        console.log('Err', err.message)
      })
  }

  sendClaps = (postId) => {
    api.post('/claps', { postId })
      .catch(err => {
        console.log('Err', err.message)
      })
  }

  deletePost = (id) => {
    api.delete('/posts/'+id)
      .then(resul => {
        console.log(resul)
        this.getPosts()
      })
      .catch(err => {
        console.log('Err', err.message)
      })
  }

  render () {
    return (
      <div>
        <NavBar />
        <Container>
          <Row>
            <Col className='md-4 lg-3'>
              <Row>
                <Col className='col-12 md-12 lg-12'>
                  <UserCard user={this.props.user}/>
                </Col>
                <Col className="col-12 sm-6 md-12 lg-12">
                  <CardMenu
                    links={[
                      <Link to="/perfil"><Person />Meu perfil</Link>,
                      <Link to="/editar"><Pen />Editar perfil</Link>
                    ]}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="col-12 sm-12 md-8 lg-7">
              <TextareaPub
                name='contentPost'
                value={this.state.contentPost}
                onChange={this.handleInputChange}
                placeholder='Escreva aqui o que você está pensando...'
                onClick={this.savePost}

              />
              { this.state.posts.map(post => (
                <CardPub key={post.createdAt}
                  username={post.User.name}
                  image={post.User.photoName}
                  dataPub={moment(post.createdAt).format("dddd, MMM DD at HH:mm a")}
                  content={post.content}
                  claps={post.claps}
                  userId={post.User.id}
                  authId={this.props.user.id}
                  onClickClaps={this.sendClaps.bind(this, post.id)}
                  onClickDelete={this.deletePost.bind(this, post.id)}
                />

              )) }
            </Col>
          </Row>
        </Container>
      </div>
    )
  } 
}

export default withContext(Home)