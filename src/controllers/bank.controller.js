import { getSequelize } from "./../database/database";
const { Sequelize } = require('sequelize');
const account = require('../models/account');
const transfer = require('../models/transfer');


const getAccounts = async (req, res) => {
    try {
        const { clientId } = req.params;
        const sequelize = await getSequelize();
        const instanceCuenta = account(sequelize, Sequelize);
        const result = await instanceCuenta.findAll({
            where: {
                numero_de_cliente: clientId
            }
        });
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};

const getAccount = async (req, res) => {
    try {
        const { clientId, accountId } = req.params;
        const sequelize = await getSequelize();
        const instanceCuenta = account(sequelize, Sequelize);
        const result = await instanceCuenta.findAll({
            where: {
                numero_de_cuenta: accountId,
                numero_de_cliente: clientId
            }
        });
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};

const postTransfer = async (req, res) => {
    try {
        const { cuenta_origen, cuenta_destino, monto, numero_cliente } = req.body;

        const sequelize = await getSequelize();
        const modelTransfer = transfer(sequelize, Sequelize);
        const result = await modelTransfer.create({
            numero_cuenta_origen: cuenta_origen,
            numero_cuenta_destino: cuenta_destino,
            monto: monto,
            numero_de_cliente: numero_cliente
        });
        console.log(result)
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error);
        console.log(error);
    }
};

const getTransfers = async (req, res) => {
    try {
        const { clientNumber } = req.params;
        // console.log('clientIddddddddddddddddddd', clientId)
        const sequelize = await getSequelize();
        const modelTransfer = transfer(sequelize, Sequelize);
        const result = await modelTransfer.findAll({
            subQuery: false,
            where: {
                numero_de_cliente: clientNumber
            }
        });
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};


export const methods = {
    getAccounts,
    getAccount,
    postTransfer,
    getTransfers
};
