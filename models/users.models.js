import mongoose from "mongoose";
import COLLECTIONS from "../utils/collections.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true, 
        unique: true
    }
})
const UserModel = new mongoose.model(COLLECTIONS.USERS, userSchema)

export const getUserDB = (data) =>{
    return UserModel.find(data)
}
export const getUserbyID = (id) =>{
    return UserModel.findById(id)
}
export const findUser = (data) =>{
    return UserModel.findOne(data)
}
export const createUSerDB = (data) =>{
    return UserModel.create(data)
}
export default UserModel
