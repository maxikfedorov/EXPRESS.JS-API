const Product = require('../models/productModel.js');

const getAllProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const createProduct = async (name, price, description) => {
    const newProduct = new Product({
        name: name,
        price: price,
        description: description
    });

    return await newProduct.save();
};

const updateProduct = async (id, name, price, description) => {
    const product = await Product.findById(id);
    if (name != null) {
        product.name = name;
    }

    if (price != null) {
        product.price = price;
    }

    if (description != null) {
        product.description = description;
    }

    return await product.save();
};

const deleteProduct = async (id) => {
    const product = await Product.findById(id);
    await product.deleteOne();
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
