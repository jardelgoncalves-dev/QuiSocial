import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthConsumer } from './AppContext'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuthenticated }) => (
      <Route
        render={props =>
          isAuthenticated() ? <Component {...props} /> : <Redirect to='/' />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute