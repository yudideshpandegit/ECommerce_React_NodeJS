import expressAsyncHandler from 'express-async-handler';
import Product from "../models/productModel.js";


//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProducts = expressAsyncHandler( async (req, res) => {
    const products = await Product.find({});
    res.json(products);

})

const getProductById = expressAsyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if(product){
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

//@desc create an new product
//@route POST /api/products/create-product
//@access Private
const createProducts = expressAsyncHandler( async (req, res) => {
    
    console.log(req.body)

})

export {getProducts, getProductById, createProducts};