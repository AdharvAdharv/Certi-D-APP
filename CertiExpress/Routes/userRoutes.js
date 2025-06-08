import { Router } from "express";
import { contObjct } from "./instans.js";

const userRouter=Router();

userRouter.get('/',(req,res)=>{
    res.send('Hello World');

})

userRouter.post('/issue',async(req,res)=>{
    const {ID,Name,Course,Grade,Date} = req.body;
    const txReceipt = await contObjct.issue(ID,Name,Course,Grade,Date);
    console.log(txReceipt);
   
    if(txReceipt){
        res.status(201).json("Certificate issued")
    }
    else{
        res.status( 400).json("Failed");
    }    
})



userRouter.get('/getCerti/:id',async(req,res)=>{
    console.log(req.params.id);

    const result = await contObjct.Certificate(req.params.id)

    if(result){
        res.status(200).json(result)
}
    else{
    res.status(400).json("Invalid ID")
    }
    
})

export default userRouter;