import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from '../../components/NavBar'

class Login extends Component {
  render () {
    return <Navbar />
  }
}

export default withRouter(Login)