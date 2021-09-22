import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './App.css';
import character from '../character.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={character} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp; WAGMIGOTCHI
        </a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap-small d-none d-sm-none d-sm-block">
            <span className="text-light">
              <span id="balance">{this.props.nftBalance} NFT</span>&nbsp;&nbsp;&nbsp;
              <span id="account">{this.props.first6Account}...{this.props.last4Account}</span>
            </span>
          </li>
        </ul>
      </nav>




    );
  }
}

export default Navbar;
