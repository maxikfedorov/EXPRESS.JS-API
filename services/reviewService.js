const Review = require('../models/reviewModel.js');

const getAllReviews = async () => {
    return await Review.find().populate('user product');
};

const getReviewById = async (id) => {
    return await Review.findById(id).populate('user product');
};

const createReview = async (userId, productId, text, rating) => {
    const newReview = new Review({
        user: userId,
        product: productId,
        text: text,
        rating: rating
    });

    return await newReview.save();
};

const updateReview = async (id, userId, productId, text, rating) => {
    const review = await Review.findById(id);
    if (userId != null) {
        review.user = userId;
    }

    if (productId != null) {
        review.product = productId;
    }

    if (text != null) {
        review.text = text;
    }

    if (rating != null) {
        review.rating = rating;
    }

    return await review.save();
};

const deleteReview = async (id) => {
    const review = await Review.findById(id);
    await review.deleteOne();
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};
