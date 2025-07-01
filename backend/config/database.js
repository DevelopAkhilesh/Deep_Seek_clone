import dotenv from "dotenv"

dotenv.config();
import mongoose from "mongoose";

const db = async ()=>{
    await mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Connected to db"))
.catch((error)=>console.error("Error in connection to db",error))}

export default db