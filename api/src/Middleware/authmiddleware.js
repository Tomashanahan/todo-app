const jwt = require("jsonwebtoken");
const { User } = require("../db");

const check_user_auth = async (req, res, next) => {
	const { authorization } = req.headers;
	let token;
	if (authorization && authorization.startsWith("Bearer")) {
		try {
			token = authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findOne({
				attributes: { exclude: ["password"] },
				where: { id: decoded.id },
			});

			if (req.user) {
				return next();
			} else {
				res.json("Token invalido");
			}
		} catch (error) {
			res.send("Token invalido");
		}
	} else if (!token) {
		res.json("No hay token o invalido");
	}
};

module.exports = check_user_auth;
