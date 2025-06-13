require("@nomicfoundation/hardhat-toolbox");
// require("hardhat-ignition");
require("dotenv").config();

module.exports = {
  solidity: "0.8.30",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
