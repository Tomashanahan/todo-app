const express = require("express");
const server = express();
const cors = require("cors");
const routes = require("./src/Routes/index");
const { db } = require("./src/db");

server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

server.use(cors());
server.use(express.json());
server.use("/", routes);

db.sync({ force: false }).then(() => {
	server.listen(3001, () => {
		console.log("server" + 3001);
	});
});

module.exports = server;
