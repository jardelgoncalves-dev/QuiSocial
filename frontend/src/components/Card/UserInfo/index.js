import React from 'react'

export default ({ user }) => (

  <div className="card" style={{marginBottom: '32px'}}>
    <div className="perfil center">
      <img src={"/uploads/" + user.photoName} alt={user.name} />
      <h5 className="username">{user.name}</h5>
      { user.bio && <p className="bio">{user.bio}</p> }
    </div>
  </div>

)