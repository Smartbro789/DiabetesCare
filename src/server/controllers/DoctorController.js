import bcrypt from "bcrypt";
import DoctorModel from "../models/Doctor.js";
import jwt from "jsonwebtoken";



export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new DoctorModel({
            name: req.body.name,
            email: req.body.email,
            passwordHash:hash,
            position: req.body.position,
        });

        const doctor = await doc.save();

        const token = jwt.sign({_id:doctor._id,}, 'secret123', {expiresIn: '30d',});

        const {passwordHash, ...userData} = doctor._doc;
        res.json({...userData, token});
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Реєстрація невдала',
        });
    }

}

export const login = async (req, res)=>{
    try{
        const doctor = await DoctorModel.findOne({email: req.body.email });
        if (!doctor) {
            return res.status(404).json({
                message: 'Користувача не знайдено'
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, doctor._doc.passwordHash);
        if (!isValidPass){
            return res.status(403).json({
                message: 'Невірний логін або пароль',
            });
        }

        const token = jwt.sign({_id:doctor._id,}, 'secret123', {expiresIn: '30d',});
        const {passwordHash, ...userData} = doctor._doc;
        res.json({
            ...userData, token,
        });

    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Авторизація невдала',
        });
    }
}

export const getMe = async (req, res)=>{
    try{
        const doctor = await DoctorModel.findById(req.userId);
        if(!doctor){
            return res.status(404).json({
                message: 'Користувача не знайдено'
            });
        }

        const {passwordHash, ...userData} = doctor._doc;
        res.json({userData});
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Немає доступу',
        });
    }
}