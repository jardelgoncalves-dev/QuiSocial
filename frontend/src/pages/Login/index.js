import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from '../../components/NavBar'
import Container from '../../components/Container'
import Row from '../../components/Row'
import Col from '../../components/Col'
import Form from '../../components/Form'
import FormGroup from '../../components/FormGroup'
import ilustrationLogin from '../../assets/images/ilustracao_login.svg'
import { logout } from '../../services/auth'

class Login extends Component {

  componentDidMount() {
    logout()
  }

  render () {
    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col className="col-12 sm-12 lg-6" style={{marginTop: '60px'}}>
              <div className="ilustration">
                <img src={ilustrationLogin} alt="Ilustração" />
              </div>
            </Col>
            <Col className="col-12 sm-12 lg-6" style={{marginTop: '40px'}}>
              <h3>Faça <span className="t-primary">login</span> para continuar</h3>
              <Form>
                <FormGroup label='Email'>
                  <input type="text" placeholder="Digite seu email" />
                </FormGroup>
                <FormGroup label='Password'>
                  <input type="password" placeholder="Digite sua senha" />
                </FormGroup>
                <div className="center">
                  <button className="btn">Logar</button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(Login)