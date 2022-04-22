import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const version = "v0.1.0";
const contractName = "Web3HuntContentManager";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy(contractName, {
    contract: contractName,
    from: deployer,
    log: true,
  });

  return true;
};

const id = contractName + version;

export default func;
func.tags = [id, version];
func.id = id;