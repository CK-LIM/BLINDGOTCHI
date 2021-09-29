// npx truffle migrate --reset --compile-all --network bscTestnet

// const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Wagmipet = artifacts.require('Wagmipet.sol')
const NFT = artifacts.require('NFT.sol')

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

module.exports = async function(deployer, network, accounts ) {
  if(network === 'rinkeby' || network ==='bscTestnet') {

    await deployer.deploy(Wagmipet)
    const wagmipet = await Wagmipet.deployed()
    
    console.log('deploy done')
    
  }

  // if(network === 'rinkeby') {

  //   await deployer.deploy(NFT)
  //   const nft = await NFT.deployed()
    
  //   console.log('deploy done')

  // }
};
