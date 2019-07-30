import React from 'react'
import Applause from '../../Icons/Applause'
import More from '../../Icons/More'
import DeleteOutline from '../../Icons/DeleteOutline'

export default ({ avatar, username, dataPub, content, claps, onClickDelete, onClickClaps, userId, authId }) => (
  <div className="card" style={{marginTop: '32px'}}>
    <div className="header">
      <div className="header-avatar">
        <img className="avatar" src={avatar} alt={username}/>
      </div>
      <div className="header-info">
        <h3 className="username">{username}</h3>
        <span className="date-time">{dataPub}</span>
      </div>
      { authId === userId  &&
        <div className="header-action">
          <div className="dropdown">
            <span><More /></span>
            <div className="dropdown-content">
              <ul>
                <li>
                  <button onClick={onClickDelete} className="transparent">
                    <DeleteOutline width='14' height='14' />Remover publicação
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      }
    </div>
    <hr className="divider" />
    <div className="content-pub">
      <p>{content}</p>
    </div>
    <div className="footer">
      <span className="t-primary">
        <button onClick={onClickClaps} className="transparent t-primary"><Applause /></button>
        {claps}
      </span>
    </div>
  </div>
)