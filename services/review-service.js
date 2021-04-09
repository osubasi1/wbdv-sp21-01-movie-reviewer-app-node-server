const Review = require('../models/review')

const findReviewById = (reviewId) => {
    return Review.findById(reviewId);
}

const findAllReviews = () => {
    return Review.find();
}

const findReviewByReviewName = (reviewName) => {
    return Review.findOne({reviewName: reviewName});
}

const createReview = (review) => {
    return Review.create(review);
}

const updateReview = (reviewId, review) => {
    return Review.updateOne({_id: reviewId}, review);
}

const deleteReview = (reviewId) => {
    return Review.deleteOne({_id: reviewId});
}

const api = {
    findReviewById, findAllReviews, createReview,
    updateReview, deleteReview
}
module.exports = api;
