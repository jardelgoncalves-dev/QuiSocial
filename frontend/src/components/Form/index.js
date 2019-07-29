import React from 'react'

export default ({ children, className, action, encType, method, style }) => (
  <form className={className} action={action} method={method} encType={encType} style={style}>
    {children}
  </form>
)