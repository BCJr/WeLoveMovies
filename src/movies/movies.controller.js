/*
For movies resource, define methods for api to act 
*/

//require movies.service file for knex and asyncError boundary for api
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

//respond with movies that are currently showing
async function list(req, res) {
	const { is_showing = false } = req.query;
	res.json({ data: await service.list(Boolean(is_showing)) });
}

//respond with the locally held movie
async function read(req, res) {
	res.json({ data: res.locals.movie });
}

//validate movie id and move object to locals
async function validateMovieId(req, res, next) {
	const { movieId } = req.params;
	const movie = await service.read(Number(movieId));

	if(movie) {
		res.locals.movie = movie;
		return next();
	}

	next({
		status: 404,
		message: "Movie cannot be found."
	});
}

//export methods with control for asyncErrors, and function to pull movie by id and respond
module.exports = {
	list: asyncErrorBoundary(list),
	read: [asyncErrorBoundary(validateMovieId), asyncErrorBoundary(read)],
	validateMovieId,
};