export const WEB3HUNT_ABI =
  [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "author",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "StateChange",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes[]",
          "name": "data_",
          "type": "bytes[]"
        }
      ],
      "name": "stateChange",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]