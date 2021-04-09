const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
    {
        reviewContent: {type: String, required: true, maxlength: 2000},
    }
);

module.exports = mongoose.model('Review', ReviewSchema);