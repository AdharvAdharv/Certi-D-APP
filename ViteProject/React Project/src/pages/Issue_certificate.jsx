import React from 'react'
import {BrowserProvider,Contract} from 'ethers';
import { useState } from 'react';
import address  from '../assets/deployed_addresses.json'
import abi from '../assets/Cert.json'


function Issue_certificate() {
  const [txDetails,setTxDetails]=useState({
    ID:0,
    Name:"",
    Course:'',
    Grade:'',
    Date:''
  } )
  const [output,setOutput]=useState()

  const provider = new BrowserProvider(window.ethereum);
 async function handleWallet(){
    const signer =await provider.getSigner()
    alert(`${signer.address} connected successfully`)
  }
  function handleChange(e){
    const {name,value} =e.target;
    console.log(name,value);
    setTxDetails((prevState)=>({...prevState,[name]:value}))
  }
  async function handleSubmit(e){
    e.preventDefault();
    console.log(txDetails);

    const signer = await provider.getSigner();
    const contObj = new Contract(address[ "CertModule#Cert"],abi.abi,signer)

    const txReceipt= await contObj.issue(txDetails.ID,txDetails.Name,txDetails.Course,txDetails.Grade,txDetails.Date)

    if(txReceipt){
      alert(`${txReceipt.hash} created successfully`)
    }else{
      alert("check Details");
    }
  }

 async  function hadndleClick(){
    const Id = parseInt(document.getElementById('iD').value);
    console.log(Id);
    

    const signer = await provider.getSigner();
    const contObj = new Contract(address[ "CertModule#Cert"],abi.abi,signer)
 
    const result= await contObj.Certificate(Id);
    
    console.log(result);
    const out = `Name:${result[0]},Course${result[1]},Grade : ${result[2]},Date : ${result[3]}`;
    setOutput(out)
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">

    <input
      type="button"
      value="Connect to MetaMask"
      onClick={handleWallet}
      className="mb-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
    />
  
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5">
      <h2 className="text-2xl font-bold text-center text-gray-800">Certificate Form</h2>
  
      <div>
        <label className="block text-gray-700 font-medium mb-1">ID:</label>
        <input
          type="text"
          name="ID"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
  
      <div>
        <label className="block text-gray-700 font-medium mb-1">Name:</label>
        <input
          type="text"
          name="Name"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
  
      <div>
        <label className="block text-gray-700 font-medium mb-1">Course:</label>
        <input
          type="text"
          name="Course"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
  
      <div>
        <label className="block text-gray-700 font-medium mb-1">Grade:</label>
        <input
          type="text"
          name="Grade"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
  
      <div>
        <label className="block text-gray-700 font-medium mb-1">Date:</label>
        <input
          type="date"
          name="Date"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
  
      <div>
        <input
          type="submit"
          value="Submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-600 transition"
        />
      </div>
    </form>
  
    <div className="mt-10 flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          id="iD"
          placeholder="Enter Certificate ID"
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="button"
          value="Get Certificate"
          onClick={hadndleClick}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
        />
      </div>
  
      <div className="text-center text-lg font-medium text-gray-800 mt-4">
        <p>{output}</p>
      </div>
    </div>
  
  </div>
  
  )
}

export default Issue_certificate