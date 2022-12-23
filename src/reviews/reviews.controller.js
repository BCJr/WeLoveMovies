/*
For Reviews resource, define methods for api to act 
*/

//require database service file by Knex and error for async service calls
const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//delete review by it's id and respond with success code
async function destroy(req, res) {
	await service.delete(Number(res.locals.review.review_id));
	res.sendStatus(204);
}

//find review by it's id and retrieve it from database, then move object to locals
async function validateReviewId(req, res, next) {
	const { reviewId } = req.params;
	const review = await service.read(Number(reviewId));

	if(review) {
		res.locals.review = review;
		return next();
	}

	next({
		status: 404,
		message: "Review cannot be found."
	});
}

// pull data from request, and default review id from locals to declare review
// send to database service to create and read, then to critic resource for contribution
// respond with built review object
async function update(req, res) {
	const newReview = {
		...req.body.data,
		review_id: res.locals.review.review_id,
	}

	await service.update(newReview);
	const review = await service.read(res.locals.review.review_id);

	const reviewToReturn = {
		...review,
		critic: await service.readCritic(res.locals.review.critic_id),
	}

	res.json({ data: reviewToReturn });
}

// readReview pulls current movie from database, attaches each critic, returns as reviews
async function readReviews(req, res) {
	const reviews = await service.readReviews(res.locals.movie.movie_id);

	for(let review of reviews) {
		const critic = await service.readCritic(review.critic_id);

		review["critic"] = critic;
	}

	res.json({ data: reviews });
}

// return delete and update, also functionality to read/get reviews
module.exports = {
	delete: [asyncErrorBoundary(validateReviewId), asyncErrorBoundary(destroy)],
	update: [asyncErrorBoundary(validateReviewId), asyncErrorBoundary(update)],
	readReviews,
};