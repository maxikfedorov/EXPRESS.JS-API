const express = require('express');
const router = express.Router();
const productService = require('../services/productService.js');

router.get('/', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Не найдено продукта с данным ID' });
        }
        res.json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const savedProduct = await productService.createProduct(req.body.name, req.body.price, req.body.description);
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body.name, req.body.price, req.body.description);
        res.json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.json({ message: 'Продукт успешно удален' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
