import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    name: {
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
    position: {
        type: String,
        required: true
    },

},{
    timestamps:true,
});
export default mongoose.model('Doctor', DoctorSchema);