import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { withContext } from '../../AppContext'
import NavBar from '../../components/NavBar'
import UserCard from '../../components/Card/UserInfo'
import CardMenu from '../../components/Card/CardMenu'
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
                  <UserCard user={this.props.user}/>
                </Col>
                <Col className="col-12 sm-6 md-12 lg-12">
                  <CardMenu
                    links={[
                      <Link href="/perfil"><i className="far fa-user"></i>Meu perfil</Link>,
                      <Link href="/editar"><i className="fas fa-pen"></i>Editar perfil</Link>
                    ]}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  } 
}

export default withContext(Home)