import mongoose from "mongoose";

const MedicalNoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true,
        unique: true,
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required: true,
    },

},{
    timestamps:true,
});
export default mongoose.model('MedicalNote', MedicalNoteSchema);