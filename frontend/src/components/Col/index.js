import React from 'react'

export default ({ children, className, style }) => (
  <div className={className} style={style}>
    {children}
  </div>
)