import RecommendationModel from "../models/Recommendation.js";
import {callAPI} from '../utils/API.js';


export const getAll = async (req, res)=>{
    try{
        const Recommendations = await RecommendationModel.find().populate('patient').exec();
        res.json(Recommendations)
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отримати записи'
        });
    }
}

export const remove = async (req, res) => {
    try {
        const RecommendationId = req.params.id;
        const doc = await RecommendationModel.findOneAndDelete({ _id: RecommendationId });

        if (!doc) {
            return res.status(404).json({
                message: 'Запис не знайдено',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося видалити запис',
        });
    }
};
export const getOne = async (req, res)=>{
    try{
        const RecommendationId = req.params.id;
        const doc = await RecommendationModel.findOne({ _id: RecommendationId });
        if (!doc) {
            return res.status(404).json({
                message: 'Запис не знайдено',
            });
        }
        res.json(doc);

    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отримати запис'
        });
    }
}

export const create = async (req, res)=>{
    const {title} = req.body;
    const text = await callAPI();
    try{
        const doc = new RecommendationModel({
            title, text});
        const Recommendation = await doc.save();
        res.json(Recommendation);
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося створити медичний запис'
        });
    }
};

export const update = async (req, res)=>{
    try {
        const RecommendationId = req.params.id;
        await RecommendationModel.updateOne({
            _id: RecommendationId,
        }, {
            title:req.body.title,
            text:req.body.text,
        },);
        res.json({
            success:true,
        });
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося оновити рекомендацію'
        });
    }
}