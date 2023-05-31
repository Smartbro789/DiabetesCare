import PatientModel from "../models/Patient.js";
import bcrypt from "bcrypt";

export const getAll = async (req, res)=>{
    try{
        const Patients = await PatientModel.find().populate('doctor').exec();
        res.json(Patients)
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отримати дані пацієнтів'
        });
    }
}

export const remove = async (req, res) => {
    try {
        const PatientId = req.params.id;
        const doc = await PatientModel.findOneAndDelete({ _id: PatientId });

        if (!doc) {
            return res.status(404).json({
                message: 'Пацієнта не знайдено',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося видалити пацієнта',
        });
    }
};
export const getOne = async (req, res)=>{
    try{
        const PatientId = req.params.id;
        const doc = await PatientModel.findOne({ _id: PatientId });
        if (!doc) {
            return res.status(404).json({
                message: 'Пацієнта не знайдено',
            });
        }
        res.json(doc);

    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отримати інформацію про пацієнта'
        });
    }
}

export const create = async (req, res)=>{
    try{
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const doc = new PatientModel({
            name:req.body.name,
            surname:req.body.surname,
            email: req.userId,
            passwordHash:hash,
            phonenumber:req.body.phonenumber,
            body_fat:req.body.body_fat,
            weight:req.body.weight,
            height:req.body.height,
            diabetestype:req.body.diabetestype,
            gender:req.body.gender,
            age:req.body.age,
        });
        const Patient = await doc.save();
        res.json(Patient);
    }catch (err){
        console.log(err);
        res.status(500).json({
           message: 'Не вдалося створити пацієнта'
        });
    }
};

export const update = async (req, res)=>{
    try {
        const PatientId = req.params.id;
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await PatientModel.updateOne({
            _id: PatientId,
        }, {
            name:req.body.name,
            surname:req.body.surname,
            email: req.userId,
            passwordHash:hash,
            phonenumber:req.body.phonenumber,
            body_fat:req.body.body_fat,
            weight:req.body.weight,
            height:req.body.height,
            diabetestype:req.body.diabetestype,
            gender:req.body.gender,
            age:req.body.age,
        },);
        res.json({
            success:true,
        });
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося оновити інформацію про пацієнта'
        });
    }
}