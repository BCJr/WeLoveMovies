/*
For movies resource, define endpoints and allowed requests
*/

// create Express router, connect with controller for requests, connect to other resources
const router = require("express").Router();
const controller = require("./movies.controller");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const methodNotAllowed = require("../errors/methodNotAllowed");


//connect movies router to theaters router after validating and selecting movieId 
router.use("/:movieId/theaters", controller.validateMovieId, theatersRouter);

//connect to reviews router after validating and selecting movie
router.use("/:movieId/reviews", controller.validateMovieId, reviewsRouter);

// route for selecting one movie 
router
	.route("/:movieId")
	.get(controller.read)
	.all(methodNotAllowed);

// base route to list all movies 
router
	.route("/")
	.get(controller.list)
	.all(methodNotAllowed);



module.exports = router;