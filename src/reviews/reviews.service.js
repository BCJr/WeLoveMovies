/*
For Reviews resource, use knex to manage database queries in JavaScript
*/

//bring in knex to manage queries and connection to database
const knex = require("../db/connection");

//find a review by Id 
function read(reviewId) {
	return knex("reviews")
		.select("*")
		.where({ review_id: reviewId })
		.first();
}

//remove a review from the database by Id
function destroy(reviewId) {
	return knex("reviews")
		.where({ review_id: reviewId })
		.del();
}

//update a review by Id
function update(review) {
	return knex("reviews")
		.select("*")
		.where({ review_id: review.review_id })
		.update(review);
}

//find a critic by their Id
function readCritic(criticId) {
	return knex("critics")
		.select("*")
		.where({ critic_id: criticId })
		.first();
}

//find all reviews for a given movie Id
function readReviews(movieId) {
	return knex("reviews")
		.select("*")
		.where({ movie_id: movieId });
}

//export queries for changing the database and ability to read databases
module.exports = {
	delete: destroy,
	read,
	update,
	readCritic,
	readReviews,
};