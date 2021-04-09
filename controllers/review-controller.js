module.exports = (app) => {

    const reviewService = require('../services/review-service');

    // this is async so we need to wait promise and then response
    const findAllReviews = (req, res) => {
        console.log("findAllReview")
        reviewService.findAllReview()
            .then((reviews) => {
                res.send(reviews);
            })
    }

    const findReviewByReviewName = (req, res) => {
        const reviewName = req.params['reviewName']
        reviewService.findReviewByReviewName(reviewName)
            .then(response => {
                if(response === null){
                    res.sendStatus(500)
                }else
                {
                    res.send(response)
                }
            })
    }
    const findReviewById = (req, res) => {
        const reviewId = req.params['reviewId'];
        reviewService.findReviewById(reviewId)
            .then(review => {
                res.json(review);
            })
    }
    const createReview = (req, res) => {
        const review = req.body;
        reviewService.findReviewByReviewName(review.reviewName)
            .then(response => {
                if(response === null){
                    // TODO: maybe we can directly login review when they create a profile here.
                    reviewService.createReview(review)
                        .then(res.send(review))
                }
                else
                {
                    res.sendStatus(500) // equivalent to res.status(500).send('Internal Server Error')
                }
            }

            )
    }

    app.get('/api/reviews', findAllReviews);
    app.get('/api/review/:reviewId', findReviewById);
    app.get('/api/review/:reviewName', findReviewByReviewName)
    app.post('/api/review', createReview);
}
