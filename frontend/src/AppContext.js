import React, { Component } from 'react'
import { isAuthenticated, logout, getUser } from './services/auth'

const AuthContext = React.createContext()

class AuthProvider extends Component {
  state = { user: null }

  constructor () {
    super()
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.logout = this.logout.bind(this)
    this.setUserContext = this.setUserContext.bind(this)
  }

  isAuthenticated = () => isAuthenticated()

  logout = () => { 
    logout()
  }

  setUserContext = () => {
    const user = getUser()
    this.setState({ user })
  }

  render () {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: this.isAuthenticated,
          logout: this.logout,
          user: this.state.user,
          setUserContext: this.setUserContext
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }