import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import session from 'express-session';

// Routes
import landingRoute from './routes/landingRoute.js';
import authRoute from './routes/authRoute.js'
import messageRoute from './routes/messageRoute.js';
import db from './config/db.js';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
// app.use(bodyParser.json());
app.use(cookieParser());
// app.use(
//     session({
//         secret: process.env.SECRETO,
//         key: process.env.KEY,
//         resave: false,
//         saveUninitialized: false,
//     })
// );
app.use(csurf({ cookie: true }));


try {
    await db.authenticate();
    db.sync();
    console.log('conectado a la db');
} catch (error) {
    console.log(error);
}

app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/auth', authRoute);
app.use('/', landingRoute);
app.use('/', messageRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`EL app esta corriendo en el puerto ${PORT}`);
});
