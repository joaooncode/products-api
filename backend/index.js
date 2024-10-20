import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config()

const app = express();
const port = process.env.PORT


//allows to use json body requests
app.use(express.json({ extended: false }))


app.post('/api/products', async (req, res) => {
    // data from user
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "All fields must be infromed!" })
    }

    // creates a new product in database
    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.error(`Error at creating a new Product: `, error.message);
        res.status(500).json({ success: false, message: "Server error" })

    }
})

app.listen(port, () => {
    connectDB()
    console.log(`Server running on port ${port}`);

})