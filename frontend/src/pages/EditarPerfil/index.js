import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withContext } from '../../AppContext'
// import api from '../../services/api'

import NavBar from '../../components/NavBar'
import UserCard from '../../components/Card/UserInfo'
import CardMenu from '../../components/Card/CardMenu'
import Form from '../../components/Form'
import FormGroup from '../../components/FormGroup'
import Container from '../../components/Container'
import Row from '../../components/Row'
import Col from '../../components/Col'
import Pen from '../../components/Icons/Pen'
import Person from '../../components/Icons/Person'

class Home extends Component {

  state = {
    name: this.props.user.name,
    bio: '',
    photo: '',
    charCount: 255
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleSelectedFile = event => {
    this.setState({
      photo: event.target.files[0]
    })
  }

  handleUpdate = () => {
    const fd = new FormData()
    const ob = { name: this.state.name, bio: this.state.bio, photo: this.state.photo }
    Object.keys(ob).forEach(prop => {
      if (ob[prop] !== '') {
        fd.append(prop, ob[prop])
      }
    })

    this.props.updateUser(fd)
      .then(() => {
        this.setState({ bio: '', photo: '' })
      })
  }

  handleBioAndlimite = event => {
    const count = event.target.value.length;
    const charLength = 255 - count;
    this.setState({ charCount: charLength, bio: event.target.value  });
  }

  render () {
    return (
      <div>
        <NavBar />
        <Container>
          <Row style={{marginBottom: '50px'}}>
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
            <h1 className="t-primary">Edite suas informações</h1>
              <Form>
                <FormGroup
                  label={'Foto do Perfil'} style={{marginTop: '100px'}}
                >
                  <div className="upload-btn-wrapper">
                    <button className="btn-upload">Clique aqui ou arraste o arquivo</button>
                    <input
                      type="file"
                      onChange={this.handleSelectedFile}
                    />
                  </div>
                  {this.state.photo && <span className='badge'>Arquivo selecionado</span>}
                </FormGroup>
                <FormGroup label='Nome'>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder='Informe seu novo nome'
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup label='Bio'>
                  <textarea
                    maxLength='255'
                    value={this.state.bio}
                    name='bio'
                    rows='4'
                    onChange={this.handleBioAndlimite}
                    placeholder='Escreva algo sobre você'
                  />
                  <div className="right">
                    <span style={{fontSize: '12px'}}>Restam {this.state.charCount} caracteres</span>
                  </div>
                </FormGroup>
              </Form>
              <div className="center">
                <button onClick={this.handleUpdate} className="btn">Salvar</button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  } 
}

export default withContext(Home)