import express from 'express'
import mongoose from "mongoose";
import router from "./router.js";
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT ?? 5000;
const DB_URL = `mongodb://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@127.0.0.1:27017/ulbiExpress?authSource=admin`;
const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api', router);

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log("Server started on PORT: " + PORT))
    } catch ( error ) {
        console.log(error)
    }
}

startApp()