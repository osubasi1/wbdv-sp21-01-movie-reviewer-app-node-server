module.exports = (app) => {

    const commentService = require('../services/review-service');


    const findAllCommentsForAReview = (req, res) => {
        const reviewId = req.params['reviewId']
        commentService.findAllCommentsForAReview(reviewId)
            .then((comments) => {
                res.send(comments);
            })
    }

    app.get('/api/comment/:reviewId', findAllCommentsForAReview);

}