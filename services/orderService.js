const Order = require('../models/orderModel.js');

const getAllOrders = async () => {
    return await Order.find().populate('user product');
};

const getOrderById = async (id) => {
    return await Order.findById(id).populate('user product');
};

const createOrder = async (user, product, quantity) => {
    const newOrder = new Order({
        user: user,
        product: product,
        quantity: quantity
    });

    return await newOrder.save();
};

const updateOrder = async (id, user, product, quantity) => {
    const order = await Order.findById(id);
    if (user != null) {
        order.user = user;
    }

    if (product != null) {
        order.product = product;
    }

    if (quantity != null) {
        order.quantity = quantity;
    }

    return await order.save();
};

const deleteOrder = async (id) => {
    const order = await Order.findById(id);
    await order.deleteOne();
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
