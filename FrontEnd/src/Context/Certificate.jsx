import React, { createContext, useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { CertABi, CertficateAddress } from "../Constants";

const CertContext = createContext();

export const useCertContext = () => useContext(CertContext);

export const CertProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);

  // connect to Metamask wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  };

  // setup contract instance
  const fetchContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(CertficateAddress, CertABi, signer);
    setContract(contractInstance);
  };

  // issue certificate function
  const issueCertificate = async (id, name, course, grade, date) => {
    try {
      if (!contract) return alert("Contract not loaded");
      const tx = await contract.issue(id, name, course, grade, date);
      await tx.wait();
      alert("Certificate issued successfully!");
    } catch (err) {
      console.error(err);
      alert("Error issuing certificate");
    }
  };

  // fetch certificate by ID
  const getCertificate = async (id) => {
    try {
      if (!contract) return alert("Contract not loaded");
      const cert = await contract.getCert(id);
      return {
        id: cert[0],
        name: cert[1],
        course: cert[2],
        grade: cert[3],
        date: cert[4],
      };
    } catch (err) {
      console.error(err);
      alert("Error fetching certificate");
    }
  };

  useEffect(() => {
    if (window.ethereum) fetchContract();
  }, [currentAccount]);

  return (
    <CertContext.Provider
      value={{
        connectWallet,
        currentAccount,
        issueCertificate,
        getCertificate,
      }}
    >
      {children}
    </CertContext.Provider>
  );
};
