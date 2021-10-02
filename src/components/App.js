import Web3 from 'web3'
import React, { Component } from 'react'
import Navbar from './Navbar'
import './App.css'
import Wagmipet from '../abis/Wagmipet.json'
import NFT from '../abis/NFT.json'
import WAGMIGOTCHI from './WAGMIGOTCHI'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    while (this.state.loading == false ) {
      if (this.state.wallet == true) {
        await this.loadBlockchainDataRepeat()
        // console.log("repeattrue")
        await this.delay(1500);
      } else {
        window.alert('Please connect metamask wallet to Rinkeby Testnet and refresh webpage.')
        await this.loadBlockchainDataRepeat()
        // console.log("repeat")
        await this.delay(1500);
      }
    }
  }

  async loadBlockchainData() {

    const web3 = window.web3;
    const infuraKey = "9aa3d95b3bc440fa88ea12eaa4456161";
    const web3Eth = new Web3(`https://mainnet.infura.io/v3/${infuraKey}`);
    const accounts = await web3.eth.getAccounts()

    this.setState({ account: accounts[0] })
    const first6Account = this.state.account.substring(0, 6)
    const last4Account = this.state.account.slice(-4)
    this.setState({ first6Account: first6Account })
    this.setState({ last4Account: last4Account })
    const networkId = await web3.eth.net.getId()
    this.setState({ networkId: networkId })



    const nft = new web3Eth.eth.Contract([{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "claim", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber1", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber2", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber3", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber4", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber5", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber6", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber7", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber8", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerClaim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "address payable", "name": "_to", "type": "address" }], "name": "withdrawFunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }], "0x94d63b7af8bb003cd435311137776f86c4be2c3b")
    this.setState({ nft })

    let nftBalance = await nft.methods.balanceOf(this.state.account).call()
    this.setState({ nftBalance })

    var conn_Eth = new Web3(new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/0866de87b4de4c7f843156d964c88c0a"));
    const Eth_wagmi = new conn_Eth.eth.Contract(Wagmipet.abi, Wagmipet.networks[4].address);

    Eth_wagmi.events.CaretakerLoved()
      .on('data', async event => {
        this.componentWillMount()
      })

    // Load Wagmipet
    const wagmiPetData = Wagmipet.networks[networkId]
    // console.log(wagmiPetData)
    if (wagmiPetData) {
      const wagmiPet = new web3.eth.Contract(Wagmipet.abi, wagmiPetData.address)
      this.setState({ wagmiPet })
      let loveInfo = await wagmiPet.methods.love(this.state.account).call()
      let love = loveInfo.love
      let hunger = await wagmiPet.methods.getHunger().call()
      let uncleanliness = await wagmiPet.methods.getUncleanliness().call()
      let boredom = await wagmiPet.methods.getBoredom().call()
      let sleepiness = await wagmiPet.methods.getSleepiness().call()
      let status = await wagmiPet.methods.getStatus().call()
      let alive = await wagmiPet.methods.getAlive().call()

      // let caretaker = await wagmiPet.methods.caretakers().call()

      let caretakerIndex = await wagmiPet.methods.caretakerIndex().call()
      this.setState({ caretakerIndex })
      this.state.caretakers = []
      let sortItem

      for (var i = 0; i < caretakerIndex; i++) {
        let caretakerAdd = await wagmiPet.methods.caretakers(i).call()
        const caretakerInfo = await wagmiPet.methods.love(caretakerAdd).call()
        this.setState({
          caretakers: [...this.state.caretakers, caretakerInfo]
        })
      }
      sortItem = [...this.state.caretakers]
      await sortItem.sort(({love:a}, {love:b}) => {
        let c = parseInt(b,10) - parseInt(a,10)
        return c;
      });
      
      this.setState({sortItem})
      this.setState({ love })
      this.setState({ hunger })
      this.setState({ uncleanliness })
      this.setState({ boredom })
      this.setState({ sleepiness })
      this.setState({ status })
      this.setState({ alive })

      this.setState({ loading: false })
      this.setState({ wallet: true })
    } else {
      while (this.state.loading == true) {
        this.setState({ wallet: false })
        window.alert('Please connect metamask wallet to Rinkeby Testnet and refresh webpage.')        
        await this.delay(1500);
        await this.loadBlockchainData()
      }
    }
  }


  async loadBlockchainDataRepeat() {

    const web3 = window.web3;
    const infuraKey = "9aa3d95b3bc440fa88ea12eaa4456161";
    const web3Eth = new Web3(`https://mainnet.infura.io/v3/${infuraKey}`);
    const accounts = await web3.eth.getAccounts()

    this.setState({ account: accounts[0] })
    const first6Account = this.state.account.substring(0, 6)
    const last4Account = this.state.account.slice(-4)
    this.setState({ first6Account: first6Account })
    this.setState({ last4Account: last4Account })
    const networkId = await web3.eth.net.getId()
    this.setState({ networkId: networkId })

    const nft = new web3Eth.eth.Contract([{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "claim", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber1", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber2", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber3", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber4", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber5", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber6", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber7", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getNumber8", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerClaim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "address payable", "name": "_to", "type": "address" }], "name": "withdrawFunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }], "0x94d63b7af8bb003cd435311137776f86c4be2c3b")
    this.setState({ nft })

    let nftBalance = await nft.methods.balanceOf(this.state.account).call()
    this.setState({ nftBalance })

    // Load Wagmipet
    const wagmiPetData = Wagmipet.networks[networkId]
    if (wagmiPetData) {

      this.state.caretakers.sort(function (a, b) {
        var keyA = a.love,
          keyB = b.love;
        // Compare the 2 dates
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      });

      this.setState({ loading: false })
      this.setState({ wallet: true })
    } else {
      this.setState({ loading: false })
      this.setState({ wallet: false })
    }
  }


  async loadWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      // Request account access if needed
      await window.ethereum.enable();
      const networkId = await window.web3.eth.net.getId()
      console.log(networkId)
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    // Non-dapp browsers...
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }


  delay = ms => new Promise(res => setTimeout(res, ms));

  clean = () => {
    this.setState({ loading: true })
    this.state.wagmiPet.methods.clean().send({ from: this.state.account }).on('transactionHash', (hash) => {
      alert("Cleaning")
      this.setState({ loading: false })
    })
  }

  feed = () => {
    this.setState({ loading: true })
    this.state.wagmiPet.methods.feed().send({ from: this.state.account }).on('transactionHash', (hash) => {
      alert("Feeding")
      this.setState({ loading: false })
    })
  }

  play = () => {
    this.setState({ loading: true })
    this.state.wagmiPet.methods.play().send({ from: this.state.account }).on('transactionHash', (hash) => {
      alert("Playing")
      this.setState({ loading: false })
    })
  }

  sleep = () => {
    this.setState({ loading: true })
    this.state.wagmiPet.methods.sleep().send({ from: this.state.account }).on('transactionHash', (hash) => {
      alert("Sleeping")
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      hunger: '0',
      uncleanliness: '0',
      boredom: '0',
      sleepiness: '0',
      status: '',
      alive: '0',
      love: '0',
      nftBalance: '0',
      caretakers: [],
      loading: true,
      wallet: true
    }
  }

  render() {
    let content
    let content2
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
      content2 = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <WAGMIGOTCHI
        account={this.state.account}
        first6Account={this.state.first6Account}
        last4Account={this.state.last4Account}
        hunger={this.state.hunger}
        uncleanliness={this.state.uncleanliness}
        boredom={this.state.boredom}
        sleepiness={this.state.sleepiness}
        status={this.state.status}
        alive={this.state.alive}
        love={this.state.love}
        nftBalance={this.state.nftBalance}
        sortItem={this.state.sortItem}
        clean={this.clean}
        feed={this.feed}
        play={this.play}
        sleep={this.sleep}
      />
    }

    return (
      <Router>
        <div>
          <Navbar
            account={this.state.account}
            first6Account={this.state.first6Account}
            last4Account={this.state.last4Account}
            nftBalance={this.state.nftBalance}
            love={this.state.love} />
          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '800px' }}>
                <div className="content mr-auto ml-auto">
                  {/* {content} */}
                  <Switch>
                    {/* <Route path="/" exact > {content} </Route> */}
                    <Route path="/" exact > {content} </Route>
                    <Route path="/BLINDGOTCHI/" exact > {content} </Route>
                    <Route path="/BLINDGOTCHI/" exact > {content2} </Route>
                  </Switch>
                </div>
              </main>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
