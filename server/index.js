import express from 'express';
import mongoose from 'mongoose';
import {registrationValidator,
        loginValidator,
        medicalNotesCreateValidation,
        patientCreateValidation, patientDiaryCreateValidation, recommendationCreateValidation} from './validations/validation.js';
import {DoctorController, MedicalNoteController, PatientController, PatientDiaryController, RecommendationController} from "./controllers/index.js";
import {handleValidationErrors, checkAuth} from "./utils/index.js";
import cors from 'cors';
mongoose
    .connect('mongodb+srv://admin:admin@diabetesapp.aspxfvt.mongodb.net/diabetesapp?retryWrites=true&w=majority')
    .then(() => console.log('Підключено до бази даних MongoDB'))
    .catch((error) => console.log('Помилка підключення до бази даних MongoDB:', error));

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login',loginValidator, handleValidationErrors, DoctorController.login);
app.post('/auth/register', registrationValidator, handleValidationErrors, DoctorController.register);
app.get('/auth/me', checkAuth, DoctorController.getMe);

app.get('/medicalnote', MedicalNoteController.getAll);
app.get('/medicalnote/:id', MedicalNoteController.getOne);
app.post('/medicalnote',checkAuth, medicalNotesCreateValidation, handleValidationErrors, MedicalNoteController.create);
app.delete('/medicalnote/:id',checkAuth, MedicalNoteController.remove);
app.patch('/medicalnote/:id',checkAuth,medicalNotesCreateValidation, handleValidationErrors, MedicalNoteController.update);

app.get('/patient', PatientController.getAll);
app.get('/patient/:id', PatientController.getOne);
app.post('/patient',checkAuth, patientCreateValidation, handleValidationErrors, PatientController.create);
app.delete('/patient/:id',checkAuth, PatientController.remove);
app.patch('/patient/:id',checkAuth,patientCreateValidation, handleValidationErrors, PatientController.update);

app.get('/patientdiary', PatientDiaryController.getAll);
app.get('/patientdiary/:id', PatientDiaryController.getOne);
app.post('/patientdiary',checkAuth, patientDiaryCreateValidation, handleValidationErrors, PatientDiaryController.create);
app.delete('/patientdiary/:id',checkAuth, PatientDiaryController.remove);
app.patch('/patientdiary/:id',checkAuth,patientDiaryCreateValidation, handleValidationErrors, PatientDiaryController.update);

app.get('/recommendation', RecommendationController.getAll);
app.get('/recommendation/:id', RecommendationController.getOne);
app.post('/recommendation',checkAuth, recommendationCreateValidation, handleValidationErrors, RecommendationController.create);
app.delete('/recommendation/:id',checkAuth, RecommendationController.remove);
app.patch('/recommendation/:id',checkAuth,recommendationCreateValidation, handleValidationErrors, RecommendationController.update);


app.listen(3333, (error) => {
    if (error) {
        return console.log(error);
    }
    console.log('Підключення сервера успішне');
});