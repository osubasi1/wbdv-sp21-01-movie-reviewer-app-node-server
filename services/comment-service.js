const Comment = require('../models/comment')

const findAllCommentsForAReview = (reviewId) => {
    return Comment.find({reviewId: reviewId});
}

const createComment = (comment) => {
    return Comment.create(comment);
}

const api = {
    findAllCommentsForAReview, createComment
}

module.exports = api;