import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import viewEngine from './config/viewEngines.js';
import initWebRoutes from './routes/web.js';
import connectDB from './config/connectDB.js';
import path from 'path';
import session from 'express-session';

let app = express();

app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

dotenv.config();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads/albums', express.static(path.join(process.cwd(), 'uploads', 'albums')));
app.use('/uploads/songs', express.static(path.join(process.cwd(), 'uploads', 'songs')));
app.use('/uploads/artists', express.static(path.join(process.cwd(), 'uploads', 'artists')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server is running on the port: " + port);
});
