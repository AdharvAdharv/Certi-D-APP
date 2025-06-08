import { ethers, WebSocketProvider } from "ethers";
import abi from './Assets/Cert.json' with {type:'json'};
import address from './Assets/deployed_addresses.json' with {type:'json'}
import { Wallet } from "ethers";


// export const provider= new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/fgh_9uGb-TpWemM_B5xp5-D-cCZFwj4c")

 const provider =new WebSocketProvider("wss://eth-sepolia.g.alchemy.com/v2/fgh_9uGb-TpWemM_B5xp5-D-cCZFwj4c");


// const signer = await provider.getSigner();
// console.log(signer);
// const wallet = new Wallet('5c20dca6c40abd5836426ef75210175191d9bedd54d01939294e1de5692158d0', provider);
// console.log(abi);
// console.log(address);

const wallet =new Wallet("5c20dca6c40abd5836426ef75210175191d9bedd54d01939294e1de5692158d0",provider)



export const contObjct = new ethers.Contract(address['CertModule#Cert'],abi.abi , wallet);

