import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'

import axios from 'axios';

import { Button } from 'primereact/button'
// import { SlideMenu } from 'primereact/slidemenu';
import { Nav, NavLink, Bars, NavMenu } from './NavbarElements'

const Topbar = () => {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = async () => {
    const response = await axios.get(`http://localhost:4000/api/auth/logout`)
  }

  const isActiveAccountLink = () => {

    return location.pathname.includes('/account')
  }

  return (
    <>
      <Nav>
          {/* <img src={require('../../images/logo.svg')} alt='logo' /> */}
        <Bars />
        <NavMenu >
          <h2 style={{ marginLeft: "10px", marginRight: "10px", color: "white" }}>{"<Name>"}</h2>
          <NavLink to='/home' >
            Home
          </NavLink>
          <NavLink to='/visuals' >
            Visuals
          </NavLink>
          <NavLink to='/shop' >
            Shop
          </NavLink>
          <NavLink to='/about' >
            About Us
          </NavLink>
          <NavLink to='/checkout'>
            Checkout
          </NavLink>
          <NavLink to='/choose-subscription'>
            Subscribe
          </NavLink>
        </NavMenu>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <Button label='Subscribe for more!' severity="danger" style={{ marginRight: "15px" }}/>
          </div>
          <NavLink to='/login' >
            Login
          </NavLink>
          <NavLink to='/account' className={isActiveAccountLink() ? 'active' : ''}>
            Account<i className="pi pi-user" style={{ fontSize: '1rem', marginLeft: "10px" }}></i>
          </NavLink>
          {/* <div style={{ display: 'flex', alignItems: 'center' }}>
            <button>
              <i className="pi pi-sign-out" onClick={handleLogout} style={{ fontSize: '1rem', marginRight: "10px" }}></i>
            </button>
          </div> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button label='Logout' severity="danger" style={{ marginLeft: "10px", marginRight: "10px" }}
             onClick={handleLogout}
            />
          </div>
      </Nav>
    </>
  );
};

export default Topbar;

          {/* <NavLink to='/player-interior-dashboard' activeStyle>
            Player Profiles
          </NavLink>
          <NavLink to='/player-compare' activeStyle>
            Compare Players
          </NavLink>
          <NavLink to='/players' activeStyle>
            Players Index
          </NavLink> */}

                      {/* <SlideMenu ref={menu} model={items} popup viewportHeight={220} menuWidth={175} />
            <Button type="button" icon="pi pi-bars pi pi-user" label="Account" rounded
            onClick={(event) => menu.current.toggle(event)} style={{ height: '75%', marginRight: '15px', backgroundColor: "black" }} />
            <i className="pi pi-user" style={{ fontSize: '1.5rem', marginRight: "10px" }}></i> */}