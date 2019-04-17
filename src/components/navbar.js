import React, { Component } from 'react';
import {Nav, Navbar} from 'react-bootstrap';

import { Link } from 'react-router-dom';


class Navigation extends Component {
  render() {
    return (

        <nav className="navbar navbar-expand-lg ">
          <ul className="navbar-nav mr-auto">
    				<li><Link to={'/home'} className="nav-link navbarx"> WURF </Link></li>
    					<li><Link to={'/login'} className="nav-link navbarx"> Login </Link></li>
    					<li><Link to={'/pricing'} className="nav-link navbarx"> Pricing </Link></li>
    					<li><Link to={'/data'} className="nav-link navbarx"> Our Data </Link></li>

  				</ul>

	      </nav>
          

    );
  }
}

export default Navigation;
    


