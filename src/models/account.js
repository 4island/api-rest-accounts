const account = (sequelize, Sequelize) => {
	const Account = sequelize.define('cuenta', {
		numero_de_cuenta: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		numero_de_cliente: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		monto: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	}, {
		timestamps: false
	});

	return Account;
}

module.exports = account;