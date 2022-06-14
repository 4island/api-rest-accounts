import { Sequelize } from 'sequelize';

export interface IModel {
  define(sequelize: Sequelize):void;
  associate():void;
}