import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    text:{
        type: String,
        required: true,
    },

},{
    timestamps:true,
});
export default mongoose.model('Recommendation', UserSchema);