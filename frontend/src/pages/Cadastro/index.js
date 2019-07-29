import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Navbar from '../../components/NavBar'
import Container from '../../components/Container'
import Row from '../../components/Row'
import Col from '../../components/Col'
import Form from '../../components/Form'
import FormGroup from '../../components/FormGroup'
import ilustrationCadastro from '../../assets/images/ilustracao_cadastro.svg'
import { logout } from '../../services/auth'
import api from '../../services/api'

class Cadastro extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  }

  componentDidMount() {
    logout()
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  onSubmitForm = e => {
    e.preventDefault()
    const { name, email, password } = this.state
    api.post('/users', { name, email, password })
      .then(() => {
        this.setState({ success: true, error: '' })
      })
      .catch(err => {
        this.setState({ success: false, error: err.response.data.error })
      })
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
              <h3>Crie uma  <span className="t-primary">conta</span> agora</h3>
              { this.state.success &&
                <div className="alert info">
                  Cadastro realizado com sucesso, <Link to="/" className="neutral"><strong>Clique aqui</strong></Link>
                  E efetue login
                </div>}
              <Form>
                <FormGroup label='Nome'>
                  <input type="text"
                    name='name'
                    value={this.state.name}
                    placeholder="Informe seu nome"
                    onChange={this.handleInputChange}
                  />
                  { this.state.error.name !== undefined &&
                    <small className="t-danger">{this.state.error.name[0]}</small> }
                </FormGroup>
                <FormGroup label='Email'>
                  <input
                    type="email"
                    name='email'
                    value={this.state.email}
                    placeholder="Informe um email válido"
                    onChange={this.handleInputChange}
                  />
                  { this.state.error.email !== undefined &&
                    <small className="t-danger">{this.state.error.email[0]}</small> }
                </FormGroup>
                <FormGroup label='Password'>
                  <input
                    type="password"
                    name='password'
                    value={this.state.password}
                    placeholder="Informe uma senha"
                    onChange={this.handleInputChange}
                  />
                  { this.state.error.password !== undefined &&
                    <small className="t-danger">{this.state.error.password[0]}</small> }
                </FormGroup>
              </Form>
                <div className="center">
                  <button onClick={this.onSubmitForm} className="btn">Cadastrar</button>
                </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(Cadastro)