import "./config/dotenv.js";
import express from 'express'
import cors from './config/cors.js';
import cookieParser from './config/cookieParser.js';
import db from './config/db.js';

import errorHandler from './middleware/errorHandler.js';
import getIpAndDevice from './middleware/getIpAndDevice.js';
import authMiddleware from "./middleware/authMiddleware.js";

import authRoute from './routes/authRoute.js';
import accountRoute from "./routes/accountRoute.js";
import folderRoute from "./routes/folderRoute.js";
import test from "./middleware/test.js";

const app = express();

app.use(express.json())
app.use(cors)
app.use(cookieParser)

app.use(getIpAndDevice)

app.use('/auth', authRoute);

// app.use(authMiddleware)
app.use(test)

app.use('/accounts', accountRoute)
app.use('/folders', folderRoute)

app.use(errorHandler)

const runApp = async () => {

    try {
        await db.execute('SELECT 1', [])
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log('Server is running at', PORT)
    })

}

runApp();