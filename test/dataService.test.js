const sinon = require('sinon');
const { expect } = require('chai');
const Data = require('../models/dataModel.js');
const dataService = require('../services/dataService.js');

describe('Data Service', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('GET-ALL should get all data', async () => {
        const stubValue = [{ name: 'test1', value: 'value1' }];
        const stub = sinon.stub(Data, 'find').returns(stubValue);
        const data = await dataService.getAllData();
        expect(data).to.equal(stubValue);
        expect(stub.calledOnce).to.be.true;
    });

    it('GET-ID should get data by id', async () => {
        const stubValue = { name: 'test1', value: 'value1' };
        const stub = sinon.stub(Data, 'findById').returns(stubValue);
        const data = await dataService.getDataById('someId');
        expect(data).to.equal(stubValue);
        expect(stub.calledOnce).to.be.true;
    });
    
    it('POST should create data', async () => {
        const stubValue = { name: 'test1', value: 'value1' };
        const saveStub = sinon.stub(Data.prototype, 'save').returns(stubValue);
        const data = await dataService.createData('test1', 'value1');
        expect(data).to.equal(stubValue);
        expect(saveStub.calledOnce).to.be.true;
    });
    
    it('PATCH should update data', async () => {
        const stubValue = { name: 'test1', value: 'value1', save: () => {} };
        const saveStub = sinon.stub(stubValue, 'save').returns(stubValue);
        const findStub = sinon.stub(Data, 'findById').returns(stubValue);
        const data = await dataService.updateData('someId', 'test2', 'value2');
        expect(data).to.equal(stubValue);
        expect(findStub.calledOnce).to.be.true;
        expect(saveStub.calledOnce).to.be.true;
    });
    
    it('DELETE should delete data', async () => {
        const stubValue = { name: 'test1', value: 'value1', deleteOne: () => {} };
        const deleteStub = sinon.stub(stubValue, 'deleteOne').returns(stubValue);
        const findStub = sinon.stub(Data, 'findById').returns(stubValue);
        await dataService.deleteData('someId');
        expect(findStub.calledOnce).to.be.true;
        expect(deleteStub.calledOnce).to.be.true;
    });
    
});
