
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
        // console.log("hereeeee====>>>")
        const comment = req.body;
        commentService.createComment(comment)
            .then(response => {
                // console.log('create comment response', response);
                res.send(response);

                  }
            )
    }
    app.post('/api/comments', createComment);
    app.get('/api/comment/:reviewId', findAllCommentsForAReview);
   

}