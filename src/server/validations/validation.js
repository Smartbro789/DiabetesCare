import {body} from 'express-validator';

export const loginValidator =[
    body('email', 'Неправильний формат пошти').isEmail(),
    body('password', 'Мінімальна довжина паролю - 8 символів').isLength({min: 8}),
];

export const registrationValidator =[
    body('name', 'Вкажіть ім`я').isLength({min:3}),
    body('email', 'Неправильний формат пошти').isEmail(),
    body('password', 'Мінімальна довжина паролю - 8 символів').isLength({min: 8}),
    body('position', 'Вкажіть посаду').isLength({min:3}),
];

export const medicalNotesCreateValidation =[
    body('title', 'Вкажіть назву рекомендації').isLength({min:3}).isString(),
    body('text', 'Наведіть рекомендацію').isLength({min:20}).isString(),
];

export const patientCreateValidation=[
    body('name', 'Вкажіть ім`я пацієнта').isLength({min:1}).isString(),
    body('surname', 'Вкажіть прізвище пацієнта').isLength({min:2}).isString(),
    body('email', 'Неправильний формат пошти').isEmail(),
    body('phonenumber', 'Неправильний формат номера телефону').isMobilePhone('uk-UA'),
    body('body_fat','Відсоток жиру в тілі введено некоректно').isNumeric(),
    body('weight','Вагу введено некоректно').isNumeric(),
    body('height','Зріст введено некоректно').isNumeric(),
    body('diabetestype', 'Оберіть опцію між 1 та 2').isLength({max:2}).isNumeric(),
    body('gender','Стать введено некоректно').isString(),
    body('age','Вік введено некоректно').isLength({max:150}).isNumeric(),
];

export const patientDiaryCreateValidation = [
    body('glucoselevel', 'Вкажіть рівень глюкози').isLength({min:1}),
    body('physicalactivity', 'Вкажіть дані про фізичну активність').isLength({min:5}).isString(),
    body('foodintake', 'Вкажіть дані про спожиту їжу та БЖВ').isLength({min:5}).isString(),
    body('medication', 'Вкажіть дані про прийняті ліки').isLength({min:5}).isString(),
    body('notes', 'Виконайте запит на отримання рекомендацій').isLength({min:10}).isString(),
];

export const recommendationCreateValidation = [
    body('title', 'Можете вказати назву'),
    body('text').isString(),
];