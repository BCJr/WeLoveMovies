// default port
const { PORT = 5000 } = process.env;

// connect app api to database resources
const app = require("./app");
const knex = require("./db/connection");

// confirmation
const listener = () => console.log(`Listening on Port ${PORT}!`);

// activate database access
knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);
