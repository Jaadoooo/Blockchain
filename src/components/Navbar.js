import React, { Component } from 'react';
import './App.css';
import bank from '../bank.png'

class Navbar extends Component {
    render() {
        return (
            <nav className='navbar navbar-dark fixed-top shadow p-3'>
                <a href='/' className="navbar-brand">
                    <img src={bank} alt='bank' width='50' height='30' className='d-inline-block align-top'/>
                    Decentralized Banking
                </a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <small>
                            Account Number: {this.props.account} 
                        </small>
                    </li>
                </ul>
            </nav>
        );
    }
}



export default Navbar;
