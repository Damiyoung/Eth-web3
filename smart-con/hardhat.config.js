
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/G0Zl_4nrC3buNsVVCYMiFefrU9oNyGd0",
      accounts: ['a7d28d02ec1ebc53f2574867e0cf0de741c67ef4d13021f2b245dccaba314683' ]
    }
  }
}