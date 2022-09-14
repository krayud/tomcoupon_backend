import moment from "moment";
import { success, fail } from '../helpers/responseGenerator.js';
import {Action, Category, Coupon } from '../models';

class CpController {
    async getAllMyActions(req, res) {
        try {
            const { userId } = res.locals;
            const allActions = await Action.findAll({
                where: {
                    userId,
                },
                order: [
                    [ 'id', 'DESC' ]
                ],
                include: [{
                  model: Category,
                  as: 'category',
                }]
            });
            res.send(success(allActions));
        } catch(e) {
            // console.log(e);
            res.send(fail('cantGetAllActions'));
        }
    }

    async getMyActionCoupons(req, res) {
        try {
            const { userId } = res.locals;
            const { id } = req.query;
            const allActions = await Action.findOne({
                where: {
                    id,
                    userId,
                },
                order: [
                    [ 'id', 'DESC' ],
                ],
                include: [{
                    model: Category,
                    as: 'category',
                },
                {
                    model: Coupon,
                    as: 'coupons',
                }]
            });
            res.send(success(allActions));
        } catch(e) {
            // console.log(e);
            res.send(fail('cantGetAllActions'));
        }
    }
}

export default new CpController();
