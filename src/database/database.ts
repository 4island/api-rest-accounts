import config from "../config";
import { Sequelize } from 'sequelize';
import { models } from '../models/index'

let dbInstance: Sequelize | null = null;

export async function connection() {
    dbInstance = new Sequelize(config.database, config.user, config.password, {
        host: 'localhost',
        dialect: 'mysql'
    });
    models.forEach(model => model.define(dbInstance as Sequelize));
    models.forEach(model => model.associate());
    await dbInstance.sync();
    try {
        await dbInstance.authenticate();
        console.log('sequelize has been aunthenticated successfully!!!');
        return dbInstance;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}