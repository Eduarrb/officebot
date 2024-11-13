import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import openai from "openai";
import dotenv from "dotenv"
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';


// Routes
import landingRoute from './routes/landingRoute.js';
import authRoute from './routes/authRoute.js'
import db from './config/db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

try {
    await db.authenticate();
    db.sync();
    console.log('conectado a la db');
} catch (error) {
    console.log(error);
}

const openAIAPI = new openai(process.env.OPENAI_API_KEY);

app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/auth', authRoute);
app.use('/', landingRoute);
app.post("/message", async (req, res) => {
    const { prompt, previousMessage } = req.body;

    let messages = [];
    if(previousMessage) {
        messages[0] = {
            role: 'assistant',
            content: previousMessage
        }
    }

    messages.push({
        role: "user",
        content: prompt,
    })
    try {
        const aiResponse = await openAIAPI.chat.completions.create({
            model: "gpt-3.5-turbo",
         
            messages: messages
        });

        res.json({
            message: aiResponse.choices[0].message.content,
            role: aiResponse.choices[0].message.role,
        });
    } catch (error) {
        console.error(error);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`EL app esta corriendo en el puerto ${PORT}`);
});
