import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config()

const app = express();
const port = process.env.PORT


//allows to use json body requests
app.use(express.json({ extended: false }))



// get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ succes: true, data: products })
    } catch (error) {
        console.log('Error fetching products:', error.message);
        res.status(500).json({ succes: false, message: "Server Error" })

    }
})

// creates a new product in database
app.post('/api/products', async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "All fields must be infromed!" })
    }
    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.error(`Error at creating a new Product: `, error.message);
        res.status(500).json({ success: false, message: "Server error" })

    }
})

// Delete product
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Product deleted!" })
    } catch (error) {
        res.status(404).json({ success: false, message: "Product not found" })
        console.log('Error at deleting product:', error.message);

    }
})

app.listen(port, () => {
    connectDB()
    console.log(`Server running on port ${port}`);

})