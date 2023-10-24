const sinon = require('sinon');
const { expect } = require('chai');
const Review = require('../models/reviewModel.js');
const reviewService = require('../services/reviewService.js');

describe('Review Service', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('GET-ALL should get all reviews', async () => {
        const stubValue = [{ user: 'user1', product: 'product1', text: 'text1', rating: 5 }];
        const stub = sinon.stub(Review, 'find').returns({
            populate: sinon.stub().returns(stubValue)
        });
        const reviews = await reviewService.getAllReviews();
        expect(reviews).to.equal(stubValue);
        expect(stub.calledOnce).to.be.true;
    });

    it('GET-ID should get review by id', async () => {
        const stubValue = { user: 'user1', product: 'product1', text: 'text1', rating: 5 };
        const stub = sinon.stub(Review, 'findById').returns({
            populate: sinon.stub().returns(stubValue)
        });
        const review = await reviewService.getReviewById('someId');
        expect(review).to.equal(stubValue);
        expect(stub.calledOnce).to.be.true;
    });

    it('POST should create review', async () => {
        const stubValue = { user: 'user1', product: 'product1', text: 'text1', rating: 5 };
        const saveStub = sinon.stub(Review.prototype, 'save').returns(stubValue);
        const review = await reviewService.createReview('user1', 'product1', 'text1', 5);
        expect(review).to.equal(stubValue);
        expect(saveStub.calledOnce).to.be.true;
    });

    it('PATCH should update review', async () => {
        const stubValue = { user: 'user1', product: 'product1', text: 'text1', rating: 5, save: () => {} };
        const saveStub = sinon.stub(stubValue, 'save').returns(stubValue);
        const findStub = sinon.stub(Review, 'findById').returns(stubValue);
        const review = await reviewService.updateReview('someId', 'user2', 'product2', 'text2', 4);
        expect(review).to.equal(stubValue);
        expect(findStub.calledOnce).to.be.true;
        expect(saveStub.calledOnce).to.be.true;
    });

    it('DELETE should delete review', async () => {
        const stubValue = { user: 'user1', product: 'product1', text: 'text1', rating: 5, deleteOne: () => {} };
        const deleteStub = sinon.stub(stubValue, 'deleteOne').returns(stubValue);
        const findStub = sinon.stub(Review, 'findById').returns(stubValue);
        await reviewService.deleteReview('someId');
        expect(findStub.calledOnce).to.be.true;
        expect(deleteStub.calledOnce).to.be.true;
    });
});
