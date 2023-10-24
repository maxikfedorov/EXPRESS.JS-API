const express = require('express');
const router = express.Router();
const reviewService = require('../services/reviewService.js');

router.get('/', async (req, res) => {
    try {
        const reviews = await reviewService.getAllReviews();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        if (review == null) {
            return res.status(404).json({ message: 'Не найдено отзыва с данным ID' });
        }
        res.json(review);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const savedReview = await reviewService.createReview(req.body.user, req.body.product, req.body.text, req.body.rating);
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedReview = await reviewService.updateReview(req.params.id, req.body.user, req.body.product, req.body.text, req.body.rating);
        res.json(updatedReview);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await reviewService.deleteReview(req.params.id);
        res.json({ message: 'Отзыв успешно удален' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
