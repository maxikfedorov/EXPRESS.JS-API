const sinon = require('sinon');
const { expect } = require('chai');
const User = require('../models/userModel.js');
const userService = require('../services/userService.js');

describe('User Service', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('GET-ALL should get all users', async () => {
        const stubValue = [{ username: 'user1', password: 'password1', email: 'email1' }];
        const stub = sinon.stub(User, 'find').returns(stubValue);
        const users = await userService.getAllUsers();
        expect(users).to.equal(stubValue);
        expect(stub.calledOnce).to.be.true;
    });

    it('GET-ID should get user by id', async () => {
        const stubValue = { username: 'user1', password: 'password1', email: 'email1' };
        const stub = sinon.stub(User, 'findById').returns(stubValue);
        const user = await userService.getUserById('someId');
        expect(user).to.equal(stubValue);
        expect(stub.calledOnce).to.be.true;
    });

    it('POST should create user', async () => {
        const stubValue = { username: 'user1', password: 'password1', email: 'email1' };
        const saveStub = sinon.stub(User.prototype, 'save').returns(stubValue);
        const user = await userService.createUser('user1', 'password1', 'email1');
        expect(user).to.equal(stubValue);
        expect(saveStub.calledOnce).to.be.true;
    });

    it('PATCH should update user', async () => {
        const stubValue = { username: 'user1', password: 'password1', email: 'email1', save: () => {} };
        const saveStub = sinon.stub(stubValue, 'save').returns(stubValue);
        const findStub = sinon.stub(User, 'findById').returns(stubValue);
        const user = await userService.updateUser('someId', 'user2', 'password2', 'email2');
        expect(user).to.equal(stubValue);
        expect(findStub.calledOnce).to.be.true;
        expect(saveStub.calledOnce).to.be.true;
    });

    it('DELETE should delete user', async () => {
        const stubValue = { username: 'user1', password: 'password1', email: 'email1', deleteOne: () => {} };
        const deleteStub = sinon.stub(stubValue, 'deleteOne').returns(stubValue);
        const findStub = sinon.stub(User, 'findById').returns(stubValue);
        await userService.deleteUser('someId');
        expect(findStub.calledOnce).to.be.true;
        expect(deleteStub.calledOnce).to.be.true;
    });
});
