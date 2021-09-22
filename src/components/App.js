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
    while (this.state.loading == false || this.state.loading == true) {
      if (this.state.wallet == true) {
        await this.loadBlockchainData()
        // console.log("repeattrue")
        await this.delay(2500);
      } else {
        window.alert('Please connect metamask wallet to Binance Smart Chain Testnet and refresh webpage.')
        await this.loadBlockchainData()
        // console.log("repeat")
        await this.delay(2500);
      }
    }
  }

  async loadBlockchainData() {

    const web3 = window.web3;
    const infuraKey = "9aa3d95b3bc440fa88ea12eaa4456161";
    const web3Eth = new Web3(`https://rinkeby.infura.io/v3/${infuraKey}`);  
    const accounts = await web3.eth.getAccounts()

    this.setState({ account: accounts[0] })
    const first6Account = this.state.account.substring(0, 6)
    const last4Account = this.state.account.slice(-4)
    this.setState({ first6Account: first6Account })
    this.setState({ last4Account: last4Account })
    const networkId = await web3.eth.net.getId()
    this.setState({ networkId: networkId })


    // Load NFT
    const nftData = NFT.networks[4]
    // console.log(nftData.address)
    if (nftData) {
      const nft = new web3Eth.eth.Contract(NFT.abi, nftData.address)
      this.setState({ nft })
      
      let nftBalance = await nft.methods.balanceOf(this.state.account).call()
      this.setState({nftBalance})
      // console.log(nftBalance)

    }


    // Load Wagmipet
    const wagmiPetData = Wagmipet.networks[networkId]
    // console.log(wagmiPetData)
    if (wagmiPetData) {
      const wagmiPet = new web3.eth.Contract(Wagmipet.abi, wagmiPetData.address)
      this.setState({ wagmiPet })
      
      let hunger = await wagmiPet.methods.getHunger().call()
      let uncleanliness = await wagmiPet.methods.getUncleanliness().call()
      let boredom = await wagmiPet.methods.getBoredom().call()
      let sleepiness = await wagmiPet.methods.getSleepiness().call()
      let status = await wagmiPet.methods.getStatus().call()
      let alive = await wagmiPet.methods.getAlive().call()
      this.setState({hunger})
      this.setState({uncleanliness})
      this.setState({boredom})
      this.setState({sleepiness})
      this.setState({status})
      this.setState({alive})

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
      nftBalance: '0',
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
        nftBalance={this.state.nftBalance}
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
          nftBalance={this.state.nftBalance}/>
          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '800px' }}>
                <div className="content mr-auto ml-auto">
                  {/* {content} */}
                  <Switch>
                    {/* <Route path="/" exact > {content} </Route> */}
                    <Route path="/" exact > {content} </Route>
                    <Route path="/WAGMIGOTCHI/" exact > {content} </Route>
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
