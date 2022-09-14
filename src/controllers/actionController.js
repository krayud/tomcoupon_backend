import {Action, Category, Coupon} from '../models';
import { success, fail } from '../helpers/responseGenerator.js';
import { getCurrentDate } from '../helpers/date.js';

const Sequelize = require('sequelize');
const { Op, } = require('sequelize');


class actionController {
    async getActualActions(req, res) {
        try {
            const currentDate = getCurrentDate();

            const { currentCategory } = req.query

            let whereMixin = {};
            if (currentCategory !== 'undefined') {
                const category = await Category.findOne({
                    where: {
                        url: currentCategory,
                    },
                });

                whereMixin = {
                    categoryId: category.id,
                }
            }
            const allActions = await Action.findAll({
                order: [
                    [ 'id', 'DESC' ]
                ],
                attributes: {
                    include: [[Sequelize.fn('COUNT', Sequelize.col('coupons.actionId')), 'soldCoupons']]
                },
                include: [
                    {
                        model: Category,
                        as: 'category',
                    },
                    {
                        model: Coupon,
                        as: 'coupons',
                        attributes: [],
                    },
                ],
                group: ['Action.id', 'category.id'],
                where: {
                    isActive: true,
                    endDate: {
                        [Op.gte]: currentDate,
                    },
                    startDate: {
                        [Op.lte]: currentDate,
                    },
                    ...whereMixin,
                },
            });

            res.json(success(allActions));
        } catch(err) {
            res.json(fail(err.toString()));
        }
    }

    async getActionById(req, res) {
        try {
            const { id }  = req.query;
            const action = await Action.findOne({
                attributes: {
                    include: [[Sequelize.fn('COUNT', Sequelize.col('coupons.actionId')), 'soldCoupons']]
                },
                include: [
                    {
                        model: Coupon,
                        as: 'coupons',
                        attributes: [],
                    },
                ],
                group: ['Action.id'],
                where: {
                    id,
                },
            });

            res.json(success(action));
        } catch(err) {
            res.json(fail(err.toString()));
        }
    }

}

export default new actionController();
