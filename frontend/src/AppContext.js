import React, { Component } from 'react'
import { isAuthenticated, logout, getUser, login, userStore } from './services/auth'
import api from './services/api'

const AuthContext = React.createContext()

class AuthProvider extends Component {

  constructor () {
    super()
    this.state = {
      user: getUser()
    }
  }

  isAuthenticated = () => isAuthenticated()

  signUp = (credentials) => {
    const { email, password } = credentials
    return api.post('/session', { email, password })
      .then(result => {
        login(result.data.token)
        userStore(result.data.user)
        this.setState({ user: getUser() })
        return result
      })
      .catch(err => err)
  }

  signIn = (userinfo) => {
    const { name, email, password } = userinfo
    return api.post('/users', { name, email, password })
      .then(resul => resul)
      .catch(err => err)
  }

  logout = () => { 
    logout()
    this.setState({
      user: {}
    })
  }

  updateUser = (data) => {
    return api.put('/users', data)
      .then(result => {
        if (result.status === 200) {
          userStore(result.data)
          this.setState({ user: getUser() })
        }
        return result
      })
      .catch(err => err)
  }

  render () {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: this.isAuthenticated,
          logout: this.logout,
          signUp: this.signUp,
          signIn: this.signIn,
          updateUser: this.updateUser,
          ...this.state
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const withContext = Component => {
  return props => {
      return (
          <AuthContext.Consumer>
              {
                  globalState => {
                      return (
                          <Component
                              {...globalState}
                              {...props}
                          />
                      )
                  }
              }
          </AuthContext.Consumer>
      )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer, withContext }