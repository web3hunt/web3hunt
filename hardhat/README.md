# hardhat starter

## DEV

### Env Vars

```bash
# http provider api url (eg infura, alchemy, ...)
export API_URL=""
export API_URL_RINKEBY=""
export API_URL_POLYGON=""
export API_URL_POLYGON_MAINNET,
export API_URL_MAINNET,
# private keys to deploy to testnet/mainnet
export PRIVATE_KEY=""
export MATIC_PRIVATE_KEY=""
export MAINNET_PRIVATE_KEY=""
# etherscan api keys (verify contracts via api)
export ETHERSCAN=""
export POLYGONSCAN=""
#
export PUBLIC_KEY=""
```

### Hardhat

```bash
# compile
npx hardhat compile

# deploy
npx hardhat run scripts/deploy.js --network NETWORK

# verify on etherscan/polygonscan/...
npx hardhat verify --network NETWORK CONTRACT_ADDRESS

# custom task: balance
npx hardhat balance --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

## References

- [Testing](https://hardhat.org/tutorial/testing-contracts.html)
- [Typescript](https://hardhat.org/guides/typescript.html)
- [Tasks](https://hardhat.org/guides/create-task.html)
