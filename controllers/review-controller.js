module.exports = (app) => {

    const reviewService = require('../services/review-service');
    const commentService = require('../services/comment-service')

    // this is async so we need to wait promise and then response
    const findAllRecentReviews = (req, res) => {
        reviewService.findAllRecentReviews()
            .then((reviews) => {
                res.send(reviews);
            })
    }

    const findAllReviewsForMovie = (req, res) => {
        const movieId = req.params['movieId']
        reviewService.findAllReviewsForMovie(movieId)
            .then( async(reviews) =>{
                for (const review of reviews){
                    const comment = await commentService.findAllCommentsForAReview(review._id)
                    console.log("commment===>>", comment)
                    review["comment"] = comment
                }
                console.log("my reviews", reviews)
                res.send(reviews)
            })
    }

    const findAllReviewsForUser = (req, res) => {
        const userId = req.params['userId']
        reviewService.findAllReviewsForUser(userId)
            .then(

            response => {
                    res.send({reviews: response})
            })
    }

    const createReview = (req, res) => {

        const review = req.body;
        reviewService.createReview(review)
            .then(response => {
                console.log('create review response', response);
                res.send(response);

                  }
            )
    }

    const updateReview = (req, res) => {
        const review = req.body;
        const reviewId = review._id
        const reviewBody = review.review;
        const reviewTitle = review.title;
        const reviewComment = review.comment;
        reviewService.updateReview(reviewId, reviewBody, reviewTitle, reviewComment)
            .then( (response) => res.send(response));
    }

    const deleteReview = (req, res) => {
        const reviewId =  req.params['reviewId'];
        reviewService.deleteReview(reviewId)
            .then((response) => res.send(response))
    }

    app.post('/api/reviews', createReview);
    app.get('/api/reviews/:movieId', findAllReviewsForMovie);
    app.get('/api/reviews/user/:userId', findAllReviewsForUser);
    app.get('/api/reviews', findAllRecentReviews)
    app.put('/api/reviews', updateReview)
    app.delete('/api/reviews/:reviewId', deleteReview)

}