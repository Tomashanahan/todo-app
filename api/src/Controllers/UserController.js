const { User } = require("../db");
const generarJWT = require("../Helpers/generarJWT");
const bcrypt = require("bcrypt");
const generarToken = require("../Helpers/generarToken");

const registrar = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const preventDuplicate = await User.findOne({ where: { email } });

		if (!preventDuplicate) {
			const newUser = await User.create({ name, email, password });
			res.json(newUser);
		} else {
			res.json(preventDuplicate);
			// res.send("El usuario ya existe");
		}
	} catch (error) {
		console.log(error);
	}
};

const perfil = (req, res) => {
	const { user } = req;
	res.json({ perfil: user });
};

const confirmarCuenta = async (req, res) => {
	const { token } = req.params;

	try {
		const user = await User.findOne({ where: { token } });
		if (user) {
			user.token = null;
			user.confirmado = true;
			await user.save();
			res.json({ msg: "Usuario confirmado correctamente!" });
		} else {
			res.send("El token es invalido");
		}
	} catch (error) {
		console.log(error);
	}
};

const iniciarSesion = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ where: { email } });
		if (user && user.confirmado === false) {
			res.send("Usuario no confirmado!");
		} else if (user) {
			let validatePassword = await bcrypt.compare(password, user.password);
			if (validatePassword) {
				res.json({ token: generarJWT(user.id) });
			} else {
				res.json("Contraseña incorrecta");
			}
		} else if (!user) {
			res.send("Usuario no existe!");
		}
	} catch (error) {
		console.log(error);
	}
};

const recuperarPass = async (req, res) => {
	const { email } = req.body;

	const existe = await User.findOne({ where: { email } });
	if (existe) {
		try {
			existe.token = generarToken(existe.id);
			await existe.save();
			res.send(existe);
			// res.send('Enviamos un email con las instruccionesK');
		} catch (error) {
			res.send(error);
		}
	} else {
		res.send("El usuario no existe");
	}
};

const comprobarToken = async (req, res) => {
	const { token } = req.params;

	const tokenValido = await User.findOne({ where: { token } });
	if (tokenValido) {
		res.json(token);
	} else {
		res.json({ msg: "Token invalido" });
	}
};

const nuevaPass = async (req, res) => {
  const { token } = req.params;
	const { password } = req.body;
  const user = await User.findOne({ where: { token } });
  if (user) {
    user.password = password
    user.token = null
    await user.save()
    res.json(user);
  } else {
    res.json({ msg: "Token invalido" });
  }
};

module.exports = {
	registrar,
	perfil,
	confirmarCuenta,
	iniciarSesion,
	recuperarPass,
	comprobarToken,
	nuevaPass,
};
