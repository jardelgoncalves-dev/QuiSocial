import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from '../../components/NavBar'
import Container from '../../components/Container'
import Row from '../../components/Row'
import Col from '../../components/Col'
import Form from '../../components/Form'
import FormGroup from '../../components/FormGroup'
import ilustrationCadastro from '../../assets/images/ilustracao_cadastro.svg'
import { logout } from '../../services/auth'

class Cadastro extends Component {

  componentDidMount() {
    logout()
  }

  render () {
    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col className="col-12 sm-12 lg-6" style={{marginTop: '50px'}}>
              <div className="ilustration">
                <img src={ilustrationCadastro} alt="Ilustração" />
              </div>
            </Col>
            <Col className="col-12 sm-12 lg-6" style={{marginTop: '30px'}}>
              <h3>Crie uma  <span class="t-primary">conta</span> agora</h3>
              <Form>
                <FormGroup label='Nome'>
                  <input type="text" placeholder="Informe seu nome" />
                </FormGroup>
                <FormGroup label='Email'>
                  <input type="text" placeholder="Informe um email válido" />
                </FormGroup>
                <FormGroup label='Password'>
                  <input type="password" placeholder="Informe uma senha" />
                </FormGroup>
                <div className="center">
                  <button className="btn">Cadastrar</button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(Cadastro)