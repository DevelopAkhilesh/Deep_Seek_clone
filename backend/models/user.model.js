import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        require:true,
        minlength:6

    }

    
 },{timestamps:true})
 const User = mongoose.model("User",userSchema)

 export default User;