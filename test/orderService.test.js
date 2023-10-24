const sinon = require('sinon');
const { expect } = require('chai');
const Order = require('../models/orderModel.js');
const orderService = require('../services/orderService.js');

describe('Order Service', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('GET-ALL should get all orders', async () => {
        const stubValue = [{ user: 'user1', product: 'product1', quantity: 1 }];
        const stub = sinon.stub(Order, 'find').returns({
            populate: sinon.stub().returns(stubValue)
        });
        const orders = await orderService.getAllOrders();
        expect(orders).to.equal(stubValue);
        expect(stub.calledOnce).to.be.true;
    });

    it('GET-ID should get order by id', async () => {
        const stubValue = { user: 'user1', product: 'product1', quantity: 1 };
        const stub = sinon.stub(Order, 'findById').returns({
            populate: sinon.stub().returns(stubValue)
        });
        const order = await orderService.getOrderById('someId');
        expect(order).to.equal(stubValue);
        expect(stub.calledOnce).to.be.true;
    });

    it('POST should create order', async () => {
        const stubValue = { user: 'user1', product: 'product1', quantity: 1 };
        const saveStub = sinon.stub(Order.prototype, 'save').returns(stubValue);
        const order = await orderService.createOrder('user1', 'product1', 1);
        expect(order).to.equal(stubValue);
        expect(saveStub.calledOnce).to.be.true;
    });

    it('PATCH should update order', async () => {
        const stubValue = { user: 'user1', product: 'product1', quantity: 1, save: () => {} };
        const saveStub = sinon.stub(stubValue, 'save').returns(stubValue);
        const findStub = sinon.stub(Order, 'findById').returns(stubValue);
        const order = await orderService.updateOrder('someId', 'user2', 'product2', 2);
        expect(order).to.equal(stubValue);
        expect(findStub.calledOnce).to.be.true;
        expect(saveStub.calledOnce).to.be.true;
    });

    it('DELETE should delete order', async () => {
        const stubValue = { user: 'user1', product: 'product1', quantity: 1, deleteOne: () => {} };
        const deleteStub = sinon.stub(stubValue, 'deleteOne').returns(stubValue);
        const findStub = sinon.stub(Order, 'findById').returns(stubValue);
        await orderService.deleteOrder('someId');
        expect(findStub.calledOnce).to.be.true;
        expect(deleteStub.calledOnce).to.be.true;
    });
});
