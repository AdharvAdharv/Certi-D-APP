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
    <div>
      
    <input type='button' value="Connect to MetaMask" onClick={handleWallet}/>
    <br></br><br></br> <br></br><br></br>
    <form onSubmit={handleSubmit}>

      <div>
        <label>ID : </label>
        <input type='text' name='ID' onChange={handleChange}></input>
      </div>

      <div>
        <label>Name : </label>
        <input type='text' name='Name' onChange={handleChange}></input>
      </div>

      <div>
        <label>Course : </label>
        <input type='text' name='Course' onChange={handleChange}></input>
      </div>

      <div>
        <label>Grade : </label>
        <input type='text' name='Grade' onChange={handleChange}></input>
      </div>

      <div>
        <label>Date : </label>
        <input type='date' name='Date' onChange={handleChange}></input>
      </div>

      <div>
        <input type='submit' value="Submit" ></input>
      </div>

    </form>

    <br></br><br></br> <br></br><br></br>
    <div>
      <input type='text' id='iD'></input>
      <input type='button' value="Get Certificate" onClick={hadndleClick}></input>
    </div>
    <div>
      <p> {output}</p>
    </div>

  </div>
  )
}

export default Issue_certificate