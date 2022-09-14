const { DataTypes, Model }  = require('sequelize');
import db from '../units/db.js';

class Action extends Model {}
Action.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    price: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
    },
    discount: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: false,
    underscored: false,
    sequelize: db,
    modelName: 'Action'
});

export default Action;
