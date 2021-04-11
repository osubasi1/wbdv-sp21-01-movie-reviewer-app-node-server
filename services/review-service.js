const Review = require('../models/review')


const findAllRecentReviews = () => {
    return Review.find({}, null, {limit: 10, sort: {"createdAt": -1}});
}

const findAllReviewsForMovie = (movieId) => {
    return Review.find({movieId: movieId});
}

const createReview = (review) => {
    return Review.create(review);
}

const deleteReview = (reviewId) => {
    return Review.remove({_id: reviewId});
}

const updateReview = (reviewId, reviewBody, reviewTitle) => {
    return Review.updateOne({_id: reviewId}, {$set: {review: reviewBody, title: reviewTitle}});
}

const findAllReviewsForUser = (userId) => {
    return Review.find({userId: userId});
}
const findReviewById = (reviewId) => {
    return Review.findById({reviewId: reviewId})
}

const api = {
    findAllRecentReviews, findAllReviewsForMovie,
    findAllReviewsForUser, createReview, deleteReview,
    updateReview, findReviewById
}

module.exports = api;