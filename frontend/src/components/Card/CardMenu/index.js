import React from 'react'

export default ({ links }) => (
  <div className="card">
    <div className="menu-options">
      <ul>
        { links.map(link => (
          <li>{link}</li>
        )) }
      </ul>
    </div>
  </div>
)