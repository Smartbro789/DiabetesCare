import PatientDiaryModel from "../models/PatientDiary.js";

export const getAll = async (req, res)=>{
    try{
        const PatientDiaries = await PatientDiaryModel.find().populate('patient').exec();
        res.json(PatientDiaries)
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отримати записи пацієнта'
        });
    }
}

export const remove = async (req, res) => {
    try {
        const PatientDiaryId = req.params.id;
        const doc = await PatientDiaryModel.findOneAndDelete({ _id: PatientDiaryId });

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
        const PatientDiaryId = req.params.id;
        const doc = await PatientDiaryModel.findOne({ _id: PatientDiaryId });
        if (!doc) {
            return res.status(404).json({
                message: 'Запис не знайдено',
            });
        }
        res.json(doc);

    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отримати інформацію про запис'
        });
    }
}

export const create = async (req, res)=>{
    try{
        const doc = new PatientDiaryModel({
            glucoselevel:req.body.glucoselevel,
            physicalactivity:req.body.physicalactivity,
            patient: req.userId,
            foodintake:req.body.foodintake,
            medication:req.body.medication,
            notes:req.body.notes,
        });
        const PatientDiary = await doc.save();
        res.json(PatientDiary);
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося створити запис'
        });
    }
};

export const update = async (req, res)=>{
    try {
        const PatientDiaryId = req.params.id;
        await PatientDiaryModel.updateOne({
            _id: PatientDiaryId,
        }, {
            glucoselevel:req.body.glucoselevel,
            physicalactivity:req.body.physicalactivity,
            patient: req.userId,
            foodintake:req.body.foodintake,
            medication:req.body.medication,
            notes:req.body.notes,
        },);
        res.json({
            success:true,
        });
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося оновити інформацію про запис'
        });
    }
}