const transfer = (sequelize, Sequelize) => {
	const Transfer = sequelize.define('transferencia', {
		numero_transferencia: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: true,
			autoIncrement: true,
		},
		numero_cuenta_origen: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		numero_cuenta_destino: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		monto: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		numero_de_cliente: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		timestamp: {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: Date.now()
		}
	}, {
		timestamps: false
	});

	return Transfer;
}

module.exports = transfer;