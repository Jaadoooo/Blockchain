import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Withdraw from './widthdraw'; // Import the Withdraw component

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            amount: '',
            showWithdrawComponent: false // Initially, the Withdraw component is not shown
        };
    }

    async componentDidMount() {
        // Check if Web3 is already injected by MetaMask
        if (window.ethereum) {
            try {
                // Request account access if needed
                await window.ethereum.enable();
                // Use MetaMask provider
                const web3 = new Web3(window.ethereum);
                this.setState({ web3 });
            } catch (error) {
                console.error(error);
            }
        }
        // Legacy dApp browsers
        else if (window.web3) {
            // Use Mist/MetaMask's provider
            const web3 = new Web3(window.web3.currentProvider);
            this.setState({ web3 });
        }
        // Fallback to localhost provider
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            // For example, use Infura if no local provider is detected
            // const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY"));
            // this.setState({ web3 });
        }
    }

    handleAmountChange = (event) => {
        const { value } = event.target;
        this.setState({ amount: value });
    };
    

    handleDeposit = () => {
        let { amount } = this.state;
        if (amount > 0) {
            this.props.stakeTokens(amount);
        } else {
            alert('Please enter a valid amount to deposit.');
        }
    };

    handleWithdraw = () => {
        this.setState({ showWithdrawComponent: true }); // Show the Withdraw component
    };

    render() {
        const { web3, amount, showWithdrawComponent } = this.state;
        if (!web3) {
            return <div>Loading Web3...</div>;
        }

        if (showWithdrawComponent) {
            return <Withdraw />;
        }

        // Assume this.props.tetherBalance is in Wei
        const tetherBalanceInEther = web3.utils.fromWei(this.props.tetherBalance, 'ether');
        const stakingBalanceInEther = web3.utils.fromWei(this.props.stakingBalance, 'ether');

        return (
            <div className='sab'>
                <div className='left'>
                    <div>
                        <h2>Staking Balance</h2>
                    </div>
                    <div className='output'>{stakingBalanceInEther} USDT</div>
                </div>
                <div className='centre'>
                    <div className='container'>
                        <h1>Crypto Bank</h1>
                        <div className='login-container'>
                            <div className='balance'>
                                <h6 style={{ textAlign: 'center', marginRight: '110px' }}>Stake Tokens </h6>
                                <h6 style={{ textAlign: 'center' }}>Balance - {tetherBalanceInEther}</h6>
                            </div>
                            <input type='text' placeholder='0' value={amount} onChange={this.handleAmountChange} />
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
                    <div className='output'>{this.props.rwdBalance} RWD </div>
                </div>
            </div>
        );
    }
}

export default Main;
