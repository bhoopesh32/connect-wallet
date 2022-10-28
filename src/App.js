import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from "react";



function App() {

  // Adding state 
  const [walletAddress,setWalletAddress] = useState("");

  useEffect(() => {
    CurrentWallet();
    addWalletListener();
  }, [walletAddress]);

  // connecting to wallet
  const connectWallet = async () => {
  // setting up the request through window
  if (typeof window != "undefined" && window.ethereum != "undefined") {
    try {
     const accounts = await window.ethereum.request({method: "eth_requestAccounts",});
     console.log(accounts[0]);
     setWalletAddress(accounts[0])
    } catch (err) {
      console.error(err.message);
    }
  } else {
    alert("Please install Metamask");
  } };

  const CurrentWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({method: "eth_accounts",});
        if (accounts.length >0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert("Please install Metamask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      alert("Please install MetaMask");
    }
  };


  
  return (
    <div className="App">
      <div className="container">
        <h2>Click Here to Connect Wallet</h2>
      <div className="button">
        <button className="button-connect" onClick={connectWallet}>
        
                <span className="is-link">
                  {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(
                        0,
                        6
                      )}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
                </span>
        </button>

      </div>
      </div>
      
    </div>
  );

};
export default App;
