/*
For Theaters resource, define endpoints and allowed requests
*/

//create Express router and link to a controller for function definitions
const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


// create route at starting point in app.js of /theaters
router
	.route("/")
	.get(controller.list)
	.all(methodNotAllowed);

module.exports = router;