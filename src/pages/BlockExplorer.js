import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import '../App.css';

// // Refer to the README doc for more information about using API
// // keys in client-side code. You should never do this in production
// // level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// // In this week's lessons we used ethers.js. Here we are using the
// // Alchemy SDK is an umbrella library with several different packages.

// // You can read more about the packages here:
// //   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function BlockExplorer() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState(null);
  const [transactions, setTransactions] = useState();
  const [receipt, setReceipt] = useState(null);
 
  async function getBlock(e) {
    try {
        setBlock(await alchemy.core.getBlock(blockNumber));
    } catch(error) {
      console.error(error)
    }
  }

  async function getBlockWithTransactions(e) {
    try {
        setTransactions(await alchemy.core.getBlockWithTransactions(blockNumber));
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
    <Link to="/accounts">
        <button variant="outlined">
            Accounts
        </button>
    </Link>

    <div className="Main">
      <div className="App-header">Block Number: {blockNumber}</div>
      <button onClick={getBlock}>Get Block Info</button>
      <button onClick={getBlockWithTransactions}>Get Block Transactions</button>
    </div>

    <main className="App-main">
      {block && 
        <div>
          <h3>Block Info</h3>
          <div><b>Hash:</b> {block.hash}</div>
          <div><b>Parent Hash:</b> {block.parentHash}</div>
          <div><b>Nonce:</b> {block.nonce}</div>
          <div><b>Miner Address:</b> {block.miner}</div>
          <div><b>Transactions Count:</b> {block.transactions.length}</div>
        </div>
      }

      <div className="App-container">
        <div>
          <h3>List of Transactions</h3>
          <ul>
            {block && block.transactions.map((tx, ndx) => 
              <li className="App-link" key={ndx} onClick={getTxReceipt(tx)}><b>{ndx + 1} - </b>{tx}</li>
            )}
          </ul>
        </div>

        <div>
          {receipt && 
            <>
              <h3>Transaction {receipt.transactionIndex + 1} Details</h3>
              <div>
                <div><b>to:</b> {receipt.to}</div>
                <div><b>from:</b> {receipt.from}</div>
                <div><b>block hash:</b> {receipt.blockHash}</div>
                <div><b>transaction hash:</b> {receipt.transactionHash}</div>
                <div><b>block number:</b> {receipt.blockNumber}</div>
              </div>
            </>
          }
        </div>
      </div>
    </main>
    </>;
  }
  
  
export default BlockExplorer;
