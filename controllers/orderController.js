const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService.js');

router.get('/', async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Не найдено заказа с данным ID' });
        }
        res.json(order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const savedOrder = await orderService.createOrder(req.body.user, req.body.product, req.body.quantity);
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedOrder = await orderService.updateOrder(req.params.id, req.body.user, req.body.product, req.body.quantity);
        res.json(updatedOrder);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await orderService.deleteOrder(req.params.id);
        res.json({ message: 'Заказ успешно удален' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
