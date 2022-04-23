// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
import {task} from "hardhat/config";
import {Action} from "./constants";
import {Web3HuntContentManager} from "../types";
import base58 from "bs58";

export const tasks = () => {
  task("accounts", "Prints the list of accounts", async (args, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
      console.log(`Address: ${account.address} , balance: ${await account.getBalance()}`);
    }
  });

  task("create-website", "Creates a new website space", async (args, hre) => {
    const { deployments, getNamedAccounts } = hre;
    const web3HuntContentManagerContract = await deployments.get("Web3HuntContentManager");
    console.log("web3HuntContentManagerContract.address: ", web3HuntContentManagerContract.address)
    const cmsContract = await hre.ethers.getContractAt(
      "Web3HuntContentManager",
      web3HuntContentManagerContract.address
    ) as Web3HuntContentManager;

    const action = Action.CREATE_WEBSITE;
    const request = action;
    const requests = [request];
    console.log("Creating website: ", requests);
    const response = await cmsContract.stateChange(requests);
    console.log("Response: ", response);
    console.log("TxHash: ", response.hash);
  });

  task("create-new-project", "Creates new project inside the deployed web3HuntContentManagerContract")
    .addParam("website", "The website id where project will be displayed" )
    .addParam("metadata", "The metadata of the project - ipfs hash")
    .setAction(async (args, hre) => {
      const {website, metadata} = args;
      const { deployments, getNamedAccounts } = hre;
      const web3HuntContentManagerContract = await deployments.get("Web3HuntContentManager");
      console.log("web3HuntContentManagerContract.address: ", web3HuntContentManagerContract.address)
      const cmsContract = await hre.ethers.getContractAt(
        "Web3HuntContentManager",
        web3HuntContentManagerContract.address
      ) as Web3HuntContentManager;

      if (metadata === undefined || metadata === "") {
        throw new Error("Metadata is required");
      }
      if (website === undefined || website === "") {
        throw new Error("Website id is required");
      }

      // parse ipfs metadata to bytes
      console.log(metadata)
      const ipfsHashesBinary = metadata.split("_").map((ipfsHashB58: string) => base58.decode(ipfsHashB58));
      console.log(ipfsHashesBinary)
      const ipfsHashesDecoded = ipfsHashesBinary.map((ipfsHashBinary: string) => new Buffer(ipfsHashBinary).toString('hex'));
      console.log(ipfsHashesDecoded)
      const ipfsHashes = ipfsHashesDecoded.map((ipfsHashDecoded: string | any[]) => ipfsHashDecoded.slice(4, ipfsHashDecoded.length))
      console.log(ipfsHashes)


      const action = Action.CREATE_PROJECT;
      const request = action + website + ipfsHashes
      const requests = [request];
      console.log("Creating project: ", requests);
      const response = await cmsContract.stateChange(requests);
      console.log("Response: ", response);
      console.log("TxHash: ", response.hash);
    });

  task("upvote-project", "Upvotes a project")
    .addParam("project", "The project id to upvote")
    .setAction(async (args, hre) => {
      const {project} = args;
      const { deployments, getNamedAccounts } = hre;
      const web3HuntContentManagerContract = await deployments.get("Web3HuntContentManager");
      console.log("web3HuntContentManagerContract.address: ", web3HuntContentManagerContract.address)
      const cmsContract = await hre.ethers.getContractAt(
        "Web3HuntContentManager",
        web3HuntContentManagerContract.address
      ) as Web3HuntContentManager;

      if (project === undefined || project === "") {
        throw new Error("Project id is required");
      }
      const action = Action.UPVOTE_PROJECT;
      const request = action + project
      const requests = [request];
      console.log("Upvoting project: ", requests);
      const response = await cmsContract.stateChange(requests);
      console.log("Response: ", response);
      console.log("TxHash: ", response.hash);
    });

  task("update-project", "Updates project with new metadata")
    .addParam("project", "The project id to update")
    .addParam("metadata", "The metadata of the project - ipfs hash")
    .setAction(async (args, hre) => {
      const {project, metadata} = args;
      const { deployments, getNamedAccounts } = hre;
      const web3HuntContentManagerContract = await deployments.get("Web3HuntContentManager");
      console.log("web3HuntContentManagerContract.address: ", web3HuntContentManagerContract.address)
      const cmsContract = await hre.ethers.getContractAt(
        "Web3HuntContentManager",
        web3HuntContentManagerContract.address
      ) as Web3HuntContentManager;

      if (metadata === undefined || metadata === "") {
        throw new Error("Metadata is required");
      }
      if (project === undefined || project === "") {
        throw new Error("Website id is required");
      }

      // parse ipfs metadata to bytes
      console.log(metadata)
      const ipfsHashesBinary = metadata.split("_").map((ipfsHashB58: string) => base58.decode(ipfsHashB58));
      console.log(ipfsHashesBinary)
      const ipfsHashesDecoded = ipfsHashesBinary.map((ipfsHashBinary: string) => new Buffer(ipfsHashBinary).toString('hex'));
      console.log(ipfsHashesDecoded)
      const ipfsHashes = ipfsHashesDecoded.map((ipfsHashDecoded: string | any[]) => ipfsHashDecoded.slice(4, ipfsHashDecoded.length))
      console.log(ipfsHashes)


      const action = Action.UPDATE_PROJECT;
      const request = action + project + ipfsHashes
      const requests = [request];
      console.log("Creating project: ", requests);
      const response = await cmsContract.stateChange(requests);
      console.log("Response: ", response);
      console.log("TxHash: ", response.hash);
    });
}