import React, { Component } from 'react'
import { isAuthenticated, logout, getUser } from './services/auth'

const AuthContext = React.createContext()

class AuthProvider extends Component {
  state = { user: getUser() }
  constructor () {
    super()
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.logout = this.logout.bind(this)
  }

  isAuthenticated = () => isAuthenticated()

  logout = () => { 
    logout()
  }

  render () {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: this.isAuthenticated,
          logout: this.logout,
          user: this.state.user
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }