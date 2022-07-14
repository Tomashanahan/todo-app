const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const generarToken = require("../Helpers/generarToken");

module.exports = (sequelize) => {
	sequelize.define(
		"User",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: { isEmail: true },
			},
			token: {
				type: DataTypes.STRING,
				defaultValue: generarToken(),
			},
			confirmado: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			hooks: {
				beforeCreate: async (user) => {
					if (user.password) {
						const salt = await bcrypt.genSaltSync(10, "a");
						user.password = bcrypt.hashSync(user.password, salt);
					}
				}
			},
			timestamps: false,
		},
	);
};
