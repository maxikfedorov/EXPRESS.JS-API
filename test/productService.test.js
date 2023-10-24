const sinon = require('sinon');
const { expect } = require('chai');
const Product = require('../models/productModel.js');
const productService = require('../services/productService.js');

describe('Product Service', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('GET-ALL should get all products', async () => {
        const stubValue = [{ name: 'product1', price: 100, description: 'description1' }];
        const stub = sinon.stub(Product, 'find').returns(stubValue);
        const products = await productService.getAllProducts();
        expect(products).to.equal(stubValue);
        expect(stub.calledOnce).to.be.true;
    });

    it('GET-ID should get product by id', async () => {
        const stubValue = { name: 'product1', price: 100, description: 'description1' };
        const stub = sinon.stub(Product, 'findById').returns(stubValue);
        const product = await productService.getProductById('someId');
        expect(product).to.equal(stubValue);
        expect(stub.calledOnce).to.be.true;
    });

    it('POST should create product', async () => {
        const stubValue = { name: 'product1', price: 100, description: 'description1' };
        const saveStub = sinon.stub(Product.prototype, 'save').returns(stubValue);
        const product = await productService.createProduct('product1', 100, 'description1');
        expect(product).to.equal(stubValue);
        expect(saveStub.calledOnce).to.be.true;
    });

    it('PATCH should update product', async () => {
        const stubValue = { name: 'product1', price: 100, description: 'description1', save: () => {} };
        const saveStub = sinon.stub(stubValue, 'save').returns(stubValue);
        const findStub = sinon.stub(Product, 'findById').returns(stubValue);
        const product = await productService.updateProduct('someId', 'product2', 200, 'description2');
        expect(product).to.equal(stubValue);
        expect(findStub.calledOnce).to.be.true;
        expect(saveStub.calledOnce).to.be.true;
    });

    it('DELETE should delete product', async () => {
        const stubValue = { name: 'product1', price: 100, description: 'description1', deleteOne: () => {} };
        const deleteStub = sinon.stub(stubValue, 'deleteOne').returns(stubValue);
        const findStub = sinon.stub(Product, 'findById').returns(stubValue);
        await productService.deleteProduct('someId');
        expect(findStub.calledOnce).to.be.true;
        expect(deleteStub.calledOnce).to.be.true;
    });
});
