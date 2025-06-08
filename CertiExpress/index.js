import express from "express";
import userRouter from "./Routes/userRoutes.js";


const app=express();
app.use(express.json())
 
app.use('/',userRouter)

app.listen(8000,()=>{
    console.log("Server is listening to port at 8000");
    
})