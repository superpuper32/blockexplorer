import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState('');
  const [receipt, setReceipt] = useState();
 
  async function getNewBlock(e) {
    try {
        setBlock(await alchemy.core.getBlock(blockNumber));
    } catch(error) {
      console.error(error)
    }
  }

  const getTxReceipt = (tx) => async (e) => {
      try {
          setReceipt(await alchemy.core.getTransactionReceipt(tx));
      } catch(error) {
        console.error(error)
      }
  }

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);

  return <>
    <div className="App">
      <div>Block Number: {blockNumber}</div>
      <button onClick={getNewBlock}>Get More Info about Current Block</button>
    </div>

    {block.hash && <div><b>Block Hash:</b> {block.hash}</div>}

    {block.miner && <div><b>Block Miner Address:</b> {block.miner}</div>}

    {receipt && <div>receipt block number: {receipt.blockNumber}</div>}
    <ul>
      {block.transactions && block.transactions.map((tx, ndx) => 
        <li key={ndx} onClick={getTxReceipt(tx)}>{tx}</li>
        )}
    </ul>
  </>;
}
  
  
export default App;
