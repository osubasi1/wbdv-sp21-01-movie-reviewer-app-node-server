const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {

        comment: {type: String, required: true, maxlength: 1000},
        movieId: {type: String, required: true},
        userId: {type: String, required: true},
        reviewId: {type: String, required: true},
        createdAt: {type: Date, required: true, default: Date.now()}

    }
);

module.exports = mongoose.model('Comment', CommentSchema);