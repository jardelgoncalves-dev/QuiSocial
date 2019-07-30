import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './AppContext'
import ProtectedRouter from './ProtectedRoute'

// import das páginas
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Perfil from './pages/Perfil'
import EditarPerfil from './pages/EditarPerfil'

const Routes = () => (
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/cadastro' component={Cadastro} />
        <ProtectedRouter exact path='/home' component={Home} />
        <ProtectedRouter exact path='/perfil' component={Perfil} />
        <ProtectedRouter exact path='/editar' component={EditarPerfil} />
      </Switch>
    </AuthProvider>
  </BrowserRouter>
)

export default Routes