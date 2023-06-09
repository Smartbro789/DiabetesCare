import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required:true,
        unique: true,
    },
    body_fat:{
        type: Number,
        required:true,
    },
    weight:{
        type: Number,
        required:true,
    },
    height:{
        type:Number,
        required:true,
    },
    diabetestype:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },

},{
    timestamps:true,
});
export default mongoose.model('Patient', PatientSchema);