const express = require("express");
const server = express();
const routes = require("./src/Routes/index");
const { db } = require("./src/db");

server.use(express.json());
server.use("/", routes);

db.sync({ force: false }).then(() => {
	server.listen(3001, () => {
		console.log("server" + 3001);
	});
});

module.exports = server;
