/*
For Theaters resource, define methods for api to act 
*/

//knex service to database and errors for async service
const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//get all theaters, for each theater get all  movies, respond in json
async function list(req, res) {
	const theaters = await service.list();

	for(let theater of theaters) {
		const movies = await service.listMovies(theater.theater_id);

		theater["movies"] = movies;
	}
	res.json({ data: theaters });
}

// if a movie exists in locals, list theaters of that movie
async function listSpecificMovie(req, res, next) {
	if(res.locals.movie) {
		return res.json({ data: await service.listTheaters(res.locals.movie.movie_id) });
	}
	next();
}

//export list to fall after not finding a specific movie
module.exports = {
	list: [asyncErrorBoundary(listSpecificMovie), asyncErrorBoundary(list)],
}