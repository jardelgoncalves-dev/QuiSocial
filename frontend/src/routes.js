import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './AppContext'
import ProtectedRouter from './ProtectedRoute'

// import das páginas
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'

const Routes = () => (
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/cadastro' component={Cadastro} />
        <ProtectedRouter exact path='/home' component={Home} />
      </Switch>
    </AuthProvider>
  </BrowserRouter>
)

export default Routes