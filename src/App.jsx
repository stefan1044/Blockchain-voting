import "./App.scss";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import { Link } from "react-router-dom";


// Update with the contract address logged out to the CLI when it was deployed
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  // store greeting in local state
  const [token, setTokenValue] = useState();
  const [password, setPassword] = useState("");
  const [publicKeyDb, setPublicKeyDb] = useState([]);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
 
  
  async function fetchToken(_address) {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider)
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
      try {
        await contract.giveToken(_address);
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }
  


  useEffect(() => {
    setPublicKeyDb((prevState) => ["asd"]);
  }, []);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const checkAuth = async () => {
    if (publicKeyDb.includes(password)) {
      console.log("success");
      let myMetaMask = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      fetchToken(myMetaMask[0]);
      console.log(myMetaMask[0]);
    } else {
      window.alert("Password doesnt match our data!");
    }
  };

  return (
    <div className="App main-container">
      <header className="App-header content-container">
        <div className="button-container">
          <button className="button-1" onClick={checkAuth}>
            Authorize
          </button>

          <Link className="button-1" to="/vote">
            Go to voting
          </Link>
        </div>
        <div className="inputs-container">
          <label className="input">
            <input
              className="input__field"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handleChange}
            />
            <span className="input__label">Enter Password</span>
          </label>
        </div>
      </header>
    </div>
  );
}

export default App;