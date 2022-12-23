/*
For movies resource, use knex to manage database queries in JavaScript
*/

//bring in knex managed database
const knex = require("../db/connection");

// list movies that are showing with the theatres showing them
function list(isShowing) {
	if(isShowing) {
		return knex("movies as m")
			.join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
			.distinct("mt.movie_id")
			.select("m.*")
			.where({ is_showing: true });
	}

	return knex("movies")
		.select("*");
}

// select the first, and by definition only, movie by movie_id
function read(movieId) {
	return knex("movies")
		.select("*")
		.where({ movie_id: movieId })
		.first();
}

//exports will go to controller used in async functions
module.exports = {
	list,
	read,
};