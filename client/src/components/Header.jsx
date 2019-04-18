import React from 'react'
import {NavLink} from 'react-router-dom';

function Header() {
  return (
   
    <div>
      <header style={headerStyle}>
      <h1>Presentations Application</h1>
          <NavLink style={linkStyle} to="/">Home</NavLink> | {' '}
          <NavLink style={linkStyle} to="/presenters/add">Add Presentantion</NavLink> | { ' '}
          <NavLink style={linkStyle} to="/presenters">Presentations</NavLink> | { ' '}
          <NavLink style={linkStyle} to="/login">Login</NavLink>
      </header>
    </div>
  )
}


const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}
export default Header;