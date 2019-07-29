import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './AppContext'

// import das páginas
import Login from './pages/Login'

const Routes = () => (
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route exact path='/' component={Login} />
      </Switch>
    </AuthProvider>
  </BrowserRouter>
)

export default Routes