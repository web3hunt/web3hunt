const hre = require("hardhat");
const ethers = hre.ethers;
const fs = require("fs");

function main() {
  let networks = [
    {
      name: "rinkeby",
      id: 4,
      priceEth: "0.000005",
      priceWei: "",
      etherscan: "https://rinkeby.etherscan.io",
      baseUri: "https://gateway.diypunks.xyz/ipfs/",
    },
    {
      name: "polygonMumbai",
      id: 80001,
      priceEth: "0.005",
      priceWei: "",
      etherscan: "https://mumbai.polygonscan.com",
      baseUri: "https://gateway.diypunks.xyz/ipfs/",
    },
    {
      name: "mainnet",
      id: 1,
      priceEth: "0.005",
      priceWei: "",
      etherscan: "https://etherscan.io",
      baseUri: "https://gateway.diypunks.xyz/ipfs/",
    },
    {
      name: "polygon",
      id: 137,
      priceEth: "10",
      priceWei: "",
      etherscan: "https://polygonscan.com",
      baseUri: "https://gateway.diypunks.xyz/ipfs/",
    },
  ];
  networks = networks.map((network) => {
    const wei = ethers.utils.parseEther(network.priceEth);
    return {
      name: network.name,
      id: network.id,
      priceEth: network.priceEth,
      priceWei: wei.toString(),
      etherscan: network.etherscan,
      baseUri: network.baseUri,
    };
  });

  fs.writeFileSync(`${__dirname}/networks.json`, JSON.stringify(networks));
}

main();
