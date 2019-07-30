import React from 'react'

export default ({ links }) => (
  <div className="card">
    <div className="menu-options">
      <ul>
        { links.map((link, index) => (
          <li key={index}>{link}</li>
        )) }
      </ul>
    </div>
  </div>
)