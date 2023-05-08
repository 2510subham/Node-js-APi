import { Sequelize, DataTypes } from 'sequelize';
import { DB_HOST,DB_PASSWORD,DB_DATABASE,DB_PORT,DB_USERNAME } from '../src/config';

// create a sequelize instance with the database connection details
export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  port: Number(DB_PORT)
});

// define the "items" model
export const Items = sequelize.define('Items', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    unique: false
  }
});