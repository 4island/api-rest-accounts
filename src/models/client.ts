import { DataTypes, Sequelize, Model, ModelAttributes, ModelStatic } from 'sequelize';
import { IModel } from './model';
import { account } from './account';
import { transfer } from './transfer';

export interface IColumns {
    numero_de_cliente: number;
}

const columns: ModelAttributes = {
    numero_de_cliente: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

class Client implements IModel {
    private _model: ModelStatic<Model<IColumns>> | any;
    get model(): ModelStatic<Model<IColumns>> {
        return this._model;
    }
    define(sequelize: Sequelize) {
        this._model = sequelize.define('cliente', columns, {timestamps: false});
    }
    associate() {
        this.model.hasMany(account.model, {
            foreignKey: 'numero_de_cliente'
        });
        this.model.hasMany(transfer.model, {
            foreignKey: 'numero_de_cliente'
        });
    }
}

export const client = new Client();