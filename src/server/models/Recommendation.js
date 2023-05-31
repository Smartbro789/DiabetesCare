import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
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
export default mongoose.model('Recommendation', RecommendationSchema);