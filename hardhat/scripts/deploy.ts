import fs from "fs";
import hre, { ethers } from "hardhat";

async function main() {
  // Grab the contract factory
  const Counter = await ethers.getContractFactory("Counter");
  const networksString = fs.readFileSync(
    `${__dirname}/../configs/networks.json`
  );
  const networks = JSON.parse(networksString.toString());

  const network = hre.network.name;
  const foundNetwork = networks.find(
    (currentNetwork: any) => currentNetwork.name === network
  );
  if (!foundNetwork) {
    throw new Error(`Failed to load network config for <${network}>`);
  }

  const price = ethers.utils.parseEther(foundNetwork.priceEth);

  // Start deployment, returning a promise that resolves to a contract object
  const counter = await Counter
    .deploy
    // foundNetwork.baseUri,
    // price.toBigInt()
    (); // Instance of the contract
  console.log(counter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
