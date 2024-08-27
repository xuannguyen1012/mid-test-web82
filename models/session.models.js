import mongoose from "mongoose";
import COLLECTIONS from "../utils/collections.js";

const sessionSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true, 
        unique: true
    },
    key:{
        type: String,
        required:true, 
    }
})
const SessionModel = new mongoose.model(COLLECTIONS.SESSION, sessionSchema)

export const createSession = (data) => {
    return SessionModel.create(data);
}

export const findStringKey = (data) =>{
    return SessionModel.findOne(data)
}
export default SessionModel