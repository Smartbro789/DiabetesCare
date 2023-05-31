import mongoose from "mongoose";

const PatientDiarySchema = new mongoose.Schema({
    glucoselevel: {
        type: Number,
        required: true
    },
    physicalactivity:{
        type: String,
        required: true,
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required: true,
    },
    foodintake:{
        type:String,
        required:true,
    },
    medication:{
        type:String,
        required:true,
    },
    notes:{
        type:String,
        required:true,
    },

},{
    timestamps:true,
});
export default mongoose.model('PatientDiary', PatientDiarySchema);