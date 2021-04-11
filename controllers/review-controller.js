module.exports = (app) => {

    const reviewService = require('../services/review-service');

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
            .then((reviews) => {
                res.send(reviews);
            })
    }

    const findAllReviewsForUser = (req, res) => {
        const userId = req.params['userId']
        reviewService.findAllReviewsForUser(userId)
            .then(response => {
                    res.send(response)
            })
    }

    const createReview = (req, res) => {
        const review = req.body;
        reviewService.createReview(review)
            .then(async response => {
                res.send(response)
                  }
            )
    }

    const updateReview = (req, res) => {
        const review = req.body;
        const reviewId = review._id
        const reviewBody = review.review;
        const reviewTitle = review.title;
        reviewService.updateReview(reviewId, reviewBody, reviewTitle)
            .then( (response) => res.send(response));
    }

    const deleteReview = (req, res) => {
        const review = req.body;
        const reviewId = review._id;
        reviewService.deleteReview(reviewId)
            .then((response) => res.send(response))
    }

    app.post('/api/review', createReview);
    app.get('/api/review/:movieId', findAllReviewsForMovie);
    app.get('/api/review/:userId', findAllReviewsForUser);
    app.get('/api/reviews', findAllRecentReviews)
    app.put('/api/review', updateReview)
    app.delete('/api/review/:reviewId', deleteReview)

}