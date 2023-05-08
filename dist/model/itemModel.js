"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../src/config");
// create a sequelize instance with the database connection details
exports.sequelize = new sequelize_1.Sequelize(config_1.DB_DATABASE, config_1.DB_USERNAME, config_1.DB_PASSWORD, {
    host: config_1.DB_HOST,
    dialect: 'mysql',
    port: Number(config_1.DB_PORT)
});
// define the "items" model
exports.Items = exports.sequelize.define('Items', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        unique: false
    }
});
