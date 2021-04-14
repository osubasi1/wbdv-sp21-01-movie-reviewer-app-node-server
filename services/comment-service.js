const Comment = require('../models/comment')

const findAllCommentsForAReview = (reviewId) => {
    return Comment.find({reviewId: reviewId});
}

const api = {
    findAllCommentsForAReview,
}

module.exports = api;