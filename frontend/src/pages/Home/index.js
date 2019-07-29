import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import NavBar from '../../components/NavBar'
import UserCard from '../../components/Card/UserInfo'
import Container from '../../components/Container'
import Row from '../../components/Row'
import Col from '../../components/Col'

class Home extends Component {
  render () {
    return (
      <div>
        <NavBar />
        <Container>
          <Row>
            <Col className='md-4 lg-3'>
              <Row>
                <Col className='col-12 md-12 lg-12'>
                  <UserCard />
                </Col>
                <Col className="col-12 sm-6 md-12 lg-12">
                  <div className="card">
                    <div className="menu-options">
                      <ul>
                        <li><Link href="/perfil"><i className="far fa-user"></i>Meu perfil</Link></li>
                        <li><Link href="/editar"><i className="fas fa-pen"></i>Editar perfil</Link></li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  } 
}

export default withRouter(Home)