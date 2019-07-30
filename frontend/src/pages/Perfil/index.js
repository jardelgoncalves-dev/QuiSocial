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
import CardPub from '../../components/Card/CardPub'
import Pen from '../../components/Icons/Pen'
import Person from '../../components/Icons/Person'

class Home extends Component {

  state = {
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

  getPosts = () => {
    api.get('/posts/user/'+this.props.user.id)
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
      .then(result => {
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

              { this.state.posts.map(post => (
                <CardPub key={post.createdAt}
                  username={this.props.user.name}
                  avatar={this.props.user.photoName}
                  dataPub={moment(post.createdAt).format("dddd, MMM DD at HH:mm a")}
                  content={post.content}
                  claps={post.claps}
                  userId={this.props.user.id}
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