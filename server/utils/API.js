import PatientDiary from "../models/PatientDiary.js";
import {Configuration, OpenAIApi} from 'openai';

const OPENAI_API_KEY = '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';
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export async function callAPI(req, res) {
    try {
        const patientDiary = await PatientDiary.findOne({}).sort({ createdAt: -1 });
        patientDiary.glucoselevel = req.body.glucoselevel;
        patientDiary.physicalactivity = req.body.physicalactivity;
        patientDiary.foodintake = req.body.foodintake;
        patientDiary.medication = req.body.medication;
        patientDiary.notes = req.notes.notes;
        if (!patientDiary) {
            return res.status(404).json({
                message: 'Щоденник пацієнта порожній',
            });
        }

        const prompt = `Рівень глюкози: ${patientDiary.glucoselevel}\nФізична активність: ${patientDiary.physicalactivity}\nПрийом їжі: ${patientDiary.foodintake}\nЛіки: ${patientDiary.medication}\nНотатки: ${patientDiary.notes}\n`;
        const response = await openai.complete({
            engine: 'text-davinci-003',
            prompt: prompt,
            maxTokens: 100,
            temperature: 0.7,
            topP:1,

        });

        const recommendations = response.choices[0].text.trim();
        const Recommendation = await recommendations.save();
        res.json(Recommendation);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не вдалося встановити зв`язок з API',
        });
    }
}