import { account } from '../models/account';
import { transfer } from '../models/transfer';
import { Request, Response } from 'express';

const getAccounts = async (req: Request, res: Response) => {
    try {
        const clientId = req.params.clientId;
        const result = await account.model.findAll({
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

const getAccount = async (req: Request, res: Response) => {
    try {
        const { clientId, accountId } = req.params;
        const result = await account.model.findOne({
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

const postTransfer = async (req: Request, res: Response) => {
    try {
        const { numero_cuenta_origen, numero_cuenta_destino, monto, numero_de_cliente } = req.body;
        const result = await transfer.model.create({
            numero_cuenta_origen: numero_cuenta_origen,
            numero_cuenta_destino: numero_cuenta_destino,
            monto: monto,
            numero_de_cliente: numero_de_cliente
        });
        uploadSourceAccount(numero_cuenta_origen, monto, numero_de_cliente);
        uploadPostingAccount(numero_cuenta_destino, monto, numero_de_cliente);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error);
        console.log(error);
    }
};

const getTransfers = async (req: Request, res: Response) => {
    try {
        const clientNumber = req.params.clientNumber;
        const result = await transfer.model.findAll({
            where: {
                numero_de_cliente: clientNumber,
            }
        });
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};

// -------- Local Functions

const getAmount = async (cOrigen: any, cliente: any) => {
    const cuenta = await account.model.findOne({
        where: {
            numero_de_cuenta: cOrigen,
            numero_de_cliente: cliente
        }
    });
    if (cuenta) {
        return cuenta.toJSON().monto
    }
    return null
}

const uploadSourceAccount = async (sourceAmount: any, newAmount: any, client: any) => {
    const oldAmount = await getAmount(sourceAmount, client) as any;
    await account.model.update({ monto: (oldAmount ? Number(oldAmount) - Number(newAmount) : newAmount) }, {
        where: {
            numero_de_cliente: client,
            numero_de_cuenta: sourceAmount
        }
    });
}

const uploadPostingAccount = async (postingAccount: any, newAmount: any, client: any) => {
    const oldAmount = await getAmount(postingAccount, client) as any;
    await account.model.update({ monto: (oldAmount ? Number(oldAmount) + Number(newAmount) : newAmount) }, {
        where: {
            numero_de_cliente: client,
            numero_de_cuenta: postingAccount
        }
    });
}


export const methods = {
    getAccounts,
    getAccount,
    postTransfer,
    getTransfers
};
