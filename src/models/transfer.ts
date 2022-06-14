import { DataTypes, Sequelize, Model, ModelAttributes, ModelStatic } from 'sequelize';
import { IModel } from './model';
import { client } from './client'

export interface IColumns {
    // numero_transferencia: number;
    numero_cuenta_origen: number;
    numero_cuenta_destino: number;
    monto: number;
    numero_de_cliente: number;
    // timestamp: Date;
}

const columns: ModelAttributes = {
    numero_transferencia: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: true
    },
    numero_cuenta_origen: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    numero_cuenta_destino: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    monto: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    numero_de_cliente: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    timestamp: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Date.now()
    }
}

class Transfer implements IModel {
    private _model: ModelStatic<Model<IColumns>> | any;
    get model(): ModelStatic<Model<IColumns>> {
        return this._model;
    }
    define(sequelize: Sequelize) {
        this._model = sequelize.define('transferencia', columns, { timestamps: false });
    }
    associate() {
        this.model.belongsTo(
            client.model, {
            foreignKey: 'numero_de_cliente'
        });
    }
}

export const transfer = new Transfer();