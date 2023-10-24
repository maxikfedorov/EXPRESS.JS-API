const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    text: String,
    rating: Number,
    date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
