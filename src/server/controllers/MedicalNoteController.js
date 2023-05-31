import MedicalNoteModel from "../models/MedicalNote.js";

export const getAll = async (req, res)=>{
    try{
        const medicalNotes = await MedicalNoteModel.find().populate('doctor').exec();
        res.json(medicalNotes)
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отримати записи'
        });
    }
}

export const remove = async (req, res) => {
    try {
        const medicalNoteId = req.params.id;
        const doc = await MedicalNoteModel.findOneAndDelete({ _id: medicalNoteId });

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
        const medicalNoteId = req.params.id;
        const doc = await MedicalNoteModel.findOne({ _id: medicalNoteId });
        if (!doc) {
            return res.status(404).json({
                message: 'Запис не знайдено',
            });
        }
        res.json(doc);

    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отримати записи'
        });
    }
}

export const create = async (req, res)=>{
    try{
        const doc = new MedicalNoteModel({
            title:req.body.title,
            text:req.body.text,
            doctor: req.userId,
        });
        const medicalNote = await doc.save();
        res.json(medicalNote);
    }catch (err){
        console.log(err);
        res.status(500).json({
           message: 'Не вдалося створити медичний запис'
        });
    }
};

export const update = async (req, res)=>{
    try {
        const medicalNoteId = req.params.id;
        await MedicalNoteModel.updateOne({
            _id: medicalNoteId,
        }, {
            title:req.body.title,
            text:req.body.text,
            doctor: req.userId,
        },);
        res.json({
            success:true,
        });
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося оновити медичний запис'
        });
    }
}