import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config()

const app = express();

const port = 5000;

app.get('/products', (req, res) => {
    res.send('Server Ready!')
})

app.listen(port, () => {
    connectDB()
    console.log(`Server running on port ${port}`);

})