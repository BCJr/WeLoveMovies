/*
For Theaters resource, use knex to manage database queries in JavaScript
*/

//bring in knex to manage database queries and point it to database folder
const knex = require("../db/connection");

// list all theaters, whole record
function list() {
	return knex("theaters")
		.select("*");
}

//list all movies by their current theater records 
function listMovies(theaterId) {
	return knex("movies_theaters as mt")
		.join("movies as m", "m.movie_id", "mt.movie_id")
		.where({ theater_id: theaterId })
		.select("m.*", "mt.created_at", "mt.updated_at", "mt.is_showing", "mt.theater_id");
}

//list theaters controlling for the movie id
function listTheaters(movieId) {
	return knex("theaters as t")
		.join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
		.where({ movie_id: movieId })
		.select("t.*", "mt.is_showing", "mt.movie_id");
}


module.exports = {
	list,
	listMovies,
	listTheaters,
}
