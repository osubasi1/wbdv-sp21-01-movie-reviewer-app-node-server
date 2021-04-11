const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
    {

        review: {type: String, required: true, maxlength: 1000},
        title: {type: String, required: true, maxlength: 100},
        movieName: {type: String, maxlength: 100},
        movieId: {type: String, required: true},
        reviewer: {type: String, required: true},
        reviewerId: {type: String, required: true},
        createdAt: {type: Date, required: true, default: Date.now()}

    }
);

module.exports = mongoose.model('Review', ReviewSchema);