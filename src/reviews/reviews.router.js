/*
For Reviews resource, define endpoints and allowed requests
*/

//create Express router, link resources's control logic, and error for bad router requests
const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// for reviewId endpoint control deleting and updating 
router
	.route("/:reviewId")
	.delete(controller.delete)
	.put(controller.update)
	.all(methodNotAllowed);

// base route for router, starting point /reviews in app.js 
router
	.route("/")
	.get(controller.readReviews)
	.all(methodNotAllowed);

module.exports = router;