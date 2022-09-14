const { DataTypes, Model }  = require('sequelize');
import db from '../units/db.js';

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: false,
    underscored: false,
    sequelize: db,
    modelName: 'User'
});

export default User;
