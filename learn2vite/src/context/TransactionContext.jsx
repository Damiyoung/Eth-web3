import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  
  console.log({ provider, signer, transactionContract, });

  return transactionContract;
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("")
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false)
  const [transactionCount, setTransactionCount]=useState(localStorage.getItem('transactionCount'))
  const handleChange = (e, name) => {
    setFormData((prevState)=>({...prevState, [name]: e.target.value}))
  }


  const checkIfWalletIsConnected = async () => {
    try {
      
      if (!ethereum) return alert("please install metamask");
  
      const accounts = await ethereum.request({ method: "eth_accounts" });
    
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
  
        //getAllTransaction();
      } else {
        console.log ('No accounts found')
      }
    } catch (error) {
      console.log(error);

      throw new Error ("No ethereum object. ")
    }
   
  };

  const connectwallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
        console.log(error);

        throw new Error ("No ethereum object. ")
    }
  };
     

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("please install metamask");

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract(); 
      const parsedAmount = ethers.utils.parseEthers(amount);
      
      await ethereum.request({ 
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208',
          value: parsedAmount._hex,
        }]
      })

     const transactionHash= await transactionContract.addToBlockChain(addressTo,parsedAmount,message,keyword);
       
      setIsLoading(true)
      console.log(` Loading-${transactionHash.hash}`)
      await transactionHash.wait();
      setIsLoading(false);
      console.log(` success-${transactionHash.hash}`)

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber( ))
      

    } catch (error) {
      console.log(error);

      throw new Error ("No ethereum object. ")
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return  (
    <TransactionContext.Provider value={{ connectwallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
      {children}
    </TransactionContext.Provider>
  );
};
