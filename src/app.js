//create environment, security, and server for app
if (process.env.USER) require("dotenv").config();
const cors = require("cors");
const express = require("express");

//connect to resources by Express routers, and handle path and pipeline errors
const moviesRouter = require("./movies/movies.router");
const theaterRouter = require("./theaters/theaters.router")
const errorHandler = require("./errors/errorHandler")
const reviewRouter = require("./reviews/reviews.router")
const notFound = require("./errors/notFound")

//create Express app using cors security and data in json format
const app = express();
app.use(cors())
app.use(express.json());

//attach resources at starting points by Express routers
app.use("/movies", moviesRouter);
app.use("/theaters", theaterRouter);
app.use("/reviews", reviewRouter)

//for requests to unserviced paths and serviced errors
app.use(notFound);
app.use(errorHandler);

module.exports = app;