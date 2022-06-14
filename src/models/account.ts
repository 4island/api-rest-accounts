import { DataTypes, Sequelize, Model, ModelAttributes, ModelStatic } from 'sequelize';
import { IModel } from './model';
import { client } from './client'

export interface IColumns {
    numero_de_cuenta: number;
    numero_de_cliente: number;
    monto: number;
}

const columns: ModelAttributes = {
    numero_de_cuenta: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numero_de_cliente: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    monto: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}

class Account implements IModel {
    private _model: ModelStatic<Model<IColumns>> | any;
    get model(): ModelStatic<Model<IColumns>> {
        return this._model;
    }
    define(sequelize: Sequelize) {
        this._model = sequelize.define('cuenta', columns, {timestamps: false});
    }
    associate() {
        this.model.belongsTo(
            client.model, {
            foreignKey: 'numero_de_cliente'
        });
    }
}

export const account = new Account();