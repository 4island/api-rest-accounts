import config from "./../config";
const { Sequelize } = require('sequelize');

const sequelizeConnection = new Sequelize(config.database, config.user, config.password, {
    host: 'localhost',
    dialect: 'mysql'
});

const getSequelize = async () => {
    try {
        await sequelizeConnection.authenticate();
        console.log('sequelize has been established successfully =D ');
        return sequelizeConnection;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {
    getSequelize
};
