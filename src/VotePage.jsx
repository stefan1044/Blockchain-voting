import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import Token from "./artifacts/contracts/Token.sol/Token.json";

const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function VotePage() {
  
  const [value, setValue] = useState("");
  const options = ["Biden", "Obama", "Mobamba"];
  const optionsPublicKeys = ["0xbda5747bfd65f08deb54cb465eb87d40e51b197e", "0xdd2fd4581271e230360230f9337d5c0430bf44c0", "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199"];
  const [option, setOption] = useState();
  const [key, setKey] = useState("");
  const [finalOption, setFinalOption] = useState();
  useEffect(()=>{setFinalOption(option)},[]);

  async function sendToken(_privKey, _address) {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log(provider);

      console.log(_address);
      //const signer = new ethers.Wallet(_privKey, provider)
  
      const signer = provider.getSigner()

      const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
      try {
        await contract.sendVote(_address);
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }
  async function debug(_address){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
    console.log(contract.viewContractOwner());
    console.log(contract.viewTokenCount(_address));
    console.log(contract.viewVoteCount(_address));
  }
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  
  /*Use like so*/
  
  //Your final variables are key and finalOption
  const handleVote = async () => {
    //setKey(value);
    //setFinalOption(optionsPublicKeys[options.indexOf(value)]);

    await sendToken(key.toString(),finalOption);
    await sleep(15000);
    debug("0xfabb0ac9d68b0b445fb7357272ff202c5651694a");
    debug("0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199")

  };
  const handleChange = async (e) => {
    setKey(e.target.value);
  };
  const handleOptionChange = async (e) => {
    setOption(e.target.value);
    setFinalOption(optionsPublicKeys[options.indexOf(e.target.value)]);
  };
  return (
    <div className="App main-container">
      <header className="App-header content-container">
        <div className="button-container">
          <button className="button-1" onClick={handleVote}>
            Vote
          </button>
          <Link className="button-1" to="/">
            Go to Authorization
          </Link>
        </div>
        <div className="inputs-container">
          <select onChange={handleOptionChange}>
            {options.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <input
            placeholder="Private key"
            //value={value}
            onChange={handleChange}
            type="text"
          ></input>
        </div>
      </header>
    </div>
  );
}

export default VotePage;