// nvm use 20.12.0
// nvm use 10.15.3

import React, { Component } from 'react';
import Navbar from './Navbar';
import './App.css';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import Imp from './main'

class App extends Component {

    async componentDidMount()
    {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }


    async loadBlockchainData()
    {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})

        const networkId = await web3.eth.net.getId()
        
        // Tether Data
        const tetherData = Tether.networks[networkId]
        if(tetherData)
        {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({tether})

            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString()})
        }
        else
        {
            window.alert('Error. Tether contract not deployed. No Network detected.')
        }

        // RWD Data
        const rwdData = RWD.networks[networkId]
        if(rwdData)
        {
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
            this.setState({rwd})

            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString()})
        }
        else
        {
            window.alert('Error. RWD contract not deployed. No Network detected.')
        }

        // Decentral Bank Data
        const decentralBankData = DecentralBank.networks[networkId]
        if(decentralBankData)
        {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            this.setState({decentralBank})

            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: stakingBalance.toString()})
        }
        else
        {
            window.alert('Error. Decentral Bank contract not deployed. No Network detected.')
        }

        // After the data is loaded
        this.setState({loading: false})

    }

    async loadWeb3()
    {
        if(window.ethereum)
        {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if(window.web3)
        {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else
        {
            window.alert('No Ethereum browser detected! Check out Metamask..')
        }
    }


    // two function one that stakes and one that unstakes —
    // leverage our decentralBank conntract — deposit tokens and unstaking
    // ALL Of This is for the staking:
    // deposit Tokens transferFrom . . . .
    // function approve transaction hash --------
    // STAKING FUNCTION ?? >> decentralBank.depositTokens(send transactionHash => )



    stakeTokens = async (amount) => {
        if (!this.state.tether || !this.state.decentralBank) {
            console.error("Tether or Decentral Bank contract not initialized.");
            return;
        }
        
        this.setState({ loading: true });
    
        // Approve the transfer first
        await this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({ from: this.state.account });
        
        // Deposit tokens
        await this.state.decentralBank.methods.depositTokens(amount).send({ from: this.state.account });
        
        
    }
    
    unstakeTokens = async () => {
        this.setState({ loading: true });
        
        // Unstake tokens
        await this.state.decentralBank.methods.unstakeTokens().send({ from: this.state.account });
        
        
    }
    


    constructor(props)  
    {
        super(props)
        this.state = {
            account: '0x0',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true
        }
    }

    updateStakingBalance = (newBalance) => {
        this.setState({ stakingBalance: newBalance });
    }
    
    updateRwdBalance = (newBalance) => {
        this.setState({ rwdBalance: newBalance });
    }


    render() 
    {
        return(
            <div>
                <Navbar account={this.state.account}/>
                <Imp 
                    tetherBalance={this.state.tetherBalance}
                    stakingBalance={this.state.stakingBalance}
                    rwdBalance={this.state.rwdBalance}
                    stakeTokens={this.stakeTokens}
                    unstakeTokens={this.unstakeTokens}

                />
            </div>
            
            );
    }
}



export default App;
