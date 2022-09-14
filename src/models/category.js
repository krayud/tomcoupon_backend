const { DataTypes, Model }  = require('sequelize');
import db from '../units/db.js';

class Category extends Model {}
Category.init({
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
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
    underscored: false,
    sequelize: db,
    modelName: 'Category'
});

export default Category;
