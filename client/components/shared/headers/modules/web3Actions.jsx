import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Web3 from "web3";
import { MarketAbi } from "./abi";
import "./App.css";
const web3 = new Web3(Web3.givenProvider);

const contractAddr = "0x2682D1be494AA808812aef0350Ab00ba319a681F";
const MarketContract = new web3.eth.Contract(MarketAbi, contractAddr);

const Web3Action = () => {
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState("0x00");
  const handleSet = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await MarketContract.methods.set(number).estimateGas();
    const result = await MarketContract.methods.set(number).send({
      from: account,
      gas,
    });
    console.log(result);
  };

  const handleGet = async (e) => {
    e.preventDefault();
    const result = await MarketContract.methods.get().call();
    setGetNumber(result);
    console.log(result);
  };
  return (
    <div className="App">
      <form onSubmit={handleSet}>
        <label>
          Set Number:
          <input
            type="text"
            name="name"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />{" "}
        </label>{" "}
        <input type="submit" value="Set Number" />
      </form>{" "}
      <br />
      <button onClick={handleGet} type="button">
        Get Number{" "}
      </button>
      {getNumber}
    </div>
  );
};

export default Web3Action;
