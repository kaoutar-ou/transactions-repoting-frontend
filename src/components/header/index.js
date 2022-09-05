import React from 'react'
import {Nav} from 'react-bootstrap';
import logo from '../../adria-logo.png';
import './style.css';

function Header() {
  return (
    <Nav className='nav'>
        <Nav.Item>
            <Nav.Link href="/">
                <img src={logo} alt='...' height={'51px'}/>
            </Nav.Link>
        </Nav.Item>
    </Nav>
  )
}

export default Header