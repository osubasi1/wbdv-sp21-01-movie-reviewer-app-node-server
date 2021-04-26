
module.exports = (app) => {

    const commentService = require('../services/comment-service');

    const findAllCommentsForAReview = (req, res) => {
        const reviewId = req.params['reviewId']
        commentService.findAllCommentsForAReview(reviewId)
            .then((comments) => {
                res.send(comments);
            })
    }

    const createComment = (req, res) => {
        const comment = req.body;
        commentService.createComment(comment)
            .then(response => {
                res.send(response);

                  }
            )
    }
    app.post('/api/comments', createComment);
    app.get('/api/comment/:reviewId', findAllCommentsForAReview);
   

}