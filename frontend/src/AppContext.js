import React, { Component } from 'react'
import { isAuthenticated, logout, getUser } from './services/auth'

const AuthContext = React.createContext()

class AuthProvider extends Component {
  constructor () {
    super()
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.logout = this.logout.bind(this)
    this.getUserAuth = this.getUserAuth.bind(this)
  }

  isAuthenticated = () => isAuthenticated()
  logout = () => logout()
  getUserAuth = () => getUser()

  render () {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: this.isAuthenticated,
          logout: this.logout,
          getUserAuth: this.getUserAuth
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }