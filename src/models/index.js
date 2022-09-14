import User from './user.js';
import Action from './action.js';
import Category from './category.js';
import Coupon from './coupon.js';
import db from '../units/db.js';

import categoriesSeeds from '../seeds/categories.js';
import usersSeeds from '../seeds/users.js';
import actionsSeeds from '../seeds/actions.js';

if (false) {
    db.sync({force: true}).then(() => {
        console.log('Sync - ok')
        // Category.bulkCreate(categoriesSeeds).then(() => {
        //     console.log('Category seeds - ok!')
        //     User.bulkCreate(usersSeeds).then(() => {
        //         console.log('User seeds - ok!')
        //         Action.bulkCreate(actionsSeeds).then(() => {
        //             console.log('Action seeds - ok!')
        //         })
        //     })
        // })

    })
}

User.hasMany(Action, { as: 'actions', foreignKey: 'userId' });
Action.belongsTo(User, { as: 'user' });

Category.hasMany(Action, { as: 'actions', foreignKey: 'categoryId' });
Action.belongsTo(Category, { as: 'category' });

Action.hasMany(Coupon, { as: 'coupons', foreignKey: 'actionId' });
Coupon.belongsTo(Action, { as: 'action' });


export {
    User,
    Action,
    Category,
    Coupon,
}
