import React from 'react'

import ChevronRight from '../Icons/ChevronRight'

export default ({ name, placeholder, value, onChange, onClick }) => (
  <div className="input-pub">
    <div className="card">
      <textarea
        value={value}
        name={name}
        rows="2"
        placeholder={placeholder}
        onChange={onChange}
      />
      <div className="right">
        <button onClick={onClick} className="btn btn-small"><ChevronRight fill='#FFF' /></button>
      </div>
    </div>
  </div>
)