const { Sequelize } = require('sequelize')
const path = require('path');


// export default new Sequelize({
//     dialect: 'sqlite',
//     storage: path.join(__dirname, './db.sqlite'),
//     logging: false
//   });

export default new Sequelize('coupons', 'couponsuser', 'hHsu27AsHfh99xqA121GH', {
  host: 'localhost',
  dialect: 'postgres'
});
