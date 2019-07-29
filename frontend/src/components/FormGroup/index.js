import React from 'react'

export default ({ children, label, style }) => (
  <div className="form-group" style={style}>
    <label htmlFor={'for' + label}>{label}</label>
    {children}
  </div>
)