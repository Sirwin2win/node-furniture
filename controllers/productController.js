const Product = require('../models/product.js');



// Get all Products
const getProducts = async (req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products); 
    } catch (error) {
        res.status(500).json({message:error.message}); 
    }   
};

// Get a single Product

const getProduct = async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message}); 
    }
};

// Create New Product

const createProduct = async (req, res)=>{
    try {

        const { title, description, price, quantity } = req.body;
    const imagePaths = req.files.map(file => file.path); // Get paths of uploaded files

    const newModel = new Product({
      title,
      description,
      quantity,
      price,
      images: imagePaths,
    });

    await newModel.save();
    res.status(201).json({ message: 'Images uploaded successfully', data: newModel });
  
        // const product = await Product.create(req.body);
        // // console.log(product)
        // res.status(200).json(product); 
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

// Update a Product

const updatedProduct = async (req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(400).json({message: "Product not found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message:error.message}); 
    }
};

// Delete a Product

const deleteProduct = async (req, res)=>{
    try {
     const {id} = req.params;
     const product = await Product.findByIdAndDelete(id);
     if(!product){
         return res.status(404).json({message: "Product not found"}); 
     }
     res.status(200).json(({message: "Product deleted successfully"}));
    } catch (error) {
     res.status(500).json({message:error.message}); 
    }
 };

 module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updatedProduct,
    deleteProduct
 };