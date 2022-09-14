const { DataTypes, Model }  = require('sequelize');
import db from '../units/db.js';

class Coupon extends Model {}
Coupon.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    buyerPhone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    buyerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdDate: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    closedDate: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
}, {
    timestamps: false,
    underscored: false,
    sequelize: db,
    modelName: 'Coupon'
});

export default Coupon;
