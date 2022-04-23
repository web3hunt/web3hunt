const hre = require("hardhat");
const ethers = hre.ethers;

function main() {
  const wei = ethers.utils.parseEther("0.00005");
  console.log(wei.toString());
}

main();
