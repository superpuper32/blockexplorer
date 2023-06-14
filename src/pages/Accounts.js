import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Accounts() {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(null);

    function handleChange(e) {
        setAddress(e.target.value);
    }

    async function getBalance(e) {
        e.preventDefault();
        try {
            setBalance(null);
            const response = await alchemy.core.getBalance(address, "latest");
            setBalance({
                address: address,
                amount: Utils.formatEther(response)
            });
            setAddress('');
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <>
            <Link to="/">
                <button className="App-navbar" variant="outlined">
                    / Block Explorer
                </button>
            </Link>
            <h2>Accounts</h2>

            <div>
                <form onSubmit={getBalance}>
                    <label htmlFor="address">Address: </label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={handleChange}
                    />
                    <input type="submit" value="Get Balance" />
                </form>
            </div>

            {balance && 
                <>
                    <div>
                        <b>address: </b>{balance.address} <b>balance: </b>{balance.amount} ETH
                    </div>
                </>
            }
        </>
    )
}

export default Accounts;