import React, { Component } from 'react';
import './widthdraw.css';
import bank from '../bank.png'
import Web3 from 'web3';


class Withdraw extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            amount: '',
            showWithdrawComponent: false
        };
    }
    
    
    

    render() {
       


        return (
            <div className='sab'>
                <div className='left'>
                    <div>
                        <h2>Staking Balance</h2>
                    </div>
                    <div className='output'>0 USDT</div>
                </div>
                <div className='centre'>
                    <div className='container'>
                        <h1>Crypto Bank</h1>
                        <div className='login-container'>
                            <div className='balance'>
                                <h6 style={{ textAlign: 'center', marginRight: '110px' }}>Stake Tokens </h6>
                                <h6 style={{ textAlign: 'center' }}>Balance - 30</h6>
                            </div>
                            <input type='text' placeholder='0'  onChange={this.handleAmountChange} />
                            <div className='Butt'>
                                <button onClick={this.handleDeposit}>Deposit</button>
                                <button onClick={this.handleWithdraw}>Withdraw</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div>
                        <h2>Reward Balance</h2>
                    </div>
                    <div className='output'>75 RWD </div>
                </div>
            </div>
        );
    }
}



export default Withdraw;
