import React from 'react'
import { Link } from 'react-router-dom'
import { AuthConsumer } from '../../AppContext'
import logo from '../../assets/images/logo.svg'

export default () => (
  <AuthConsumer>
    {({ isAuthenticated }) => (
      <nav className="navbar">
        <input type="checkbox" id="navbar-check" />
        <div className="navbar-header">
          <div className="navbar-logo">
            <img src={logo} alt="Logo do site" />
          </div>
          <div className="navbar-title">
            <span>QuiSocial</span>
          </div>
        </div>
        <div className="navbar-btn">
          <label htmlFor="navbar-check">
            <span />
            <span />
            <span />
          </label>
        </div>
        { isAuthenticated() ?(
          <div className="navbar-links">
            <Link to="/home">Home</Link>
            <Link to="/">Log out</Link>
          </div>
        ) : (
          <div className="navbar-links">
            <Link to="/">Login</Link>
            <Link to="/cadastro">Cadastro</Link>
          </div>
        )}
      </nav>
    )}
  </AuthConsumer>
)