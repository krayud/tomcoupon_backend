import moment from "moment";
import { success, fail } from '../helpers/responseGenerator.js';
import {Action, Category, Coupon} from '../models';
import { generateCoupon } from '../helpers/couponGenerator.js';
import { getCurrentTimestamp } from '../helpers/date.js';

class CpController {
    async testCPAPI(req, res) {
        res.send(success('test cp api'));
    }

    async addNewAction(req, res) {
        const { title, text, isActive, userId, categoryId, startDate, endDate, logo, price, discount } = req.body;
        try {
            await Action.create({
                title,
                text,
                logo,
                price,
                isActive,
                userId,
                categoryId,
                startDate,
                endDate,
                discount,
            });
            res.send(success('successAddNewAction'));
        } catch(e) {
            // console.log(e);
            res.send(fail('cantCreateNewAction'));
        }
    }

    async addNewCoupon(req, res) {
        const { actionId, email, phone } = req.body;
        try {
            const time = getCurrentTimestamp();
            await Coupon.create({
                actionId,
                buyerPhone: phone,
                buyerEmail: email,
                createdDate: time,
                number: generateCoupon(),
            });
            res.send(success('successAddNewCoupon'));
        } catch(e) {
            // console.log(e);
            res.send(fail('cantCreateNewCoupon' + e.toString()));
        }
    }

    async updateAction(req, res) {
        const { title, text, isActive, userId, categoryId, startDate, endDate, actionId, logo, price, discount } = req.body;
        try {
            await Action.update({
                title,
                text,
                isActive,
                logo,
                price,
                userId,
                categoryId,
                startDate,
                endDate,
                discount,
            },
            {
                where: {
                    id: actionId,
                }
            });
            res.send(success('successUpdateAction'));
        } catch(e) {
            // console.log(e);
            res.send(fail('cantUpdateAction'));
        }
    }

    async switchActionActive(req, res) {
        const { id, currentValue } = req.body;
        try {
            await Action.update({
                isActive: !currentValue,
            },
            {
                where: {
                    id,
                }
            });
            res.send(success({ isActive: !currentValue }));
        } catch(e) {
            // console.log(e);
            res.send(fail('cantSwitchActionStatus'));
        }
    }

    async getAllActions(req, res) {
        try {
            const allActions = await Action.findAll({
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

    async getAllCouponsForAction(req, res) {
        try {
            const actionId = req.query.id;
            const coupons = await Coupon.findAll({
                where: {
                    actionId,
                },
                order: [
                    [ 'id', 'DESC' ]
                ],
            });
            res.send(success(coupons));
        } catch(e) {
            res.send(fail('cantGetCouponsForAction'));
        }
    }

    async getActionById(req, res) {
        try {
            const actionId = req.query.id;
            const action = await Action.findOne({
                where: {
                    id: actionId,
                }
            });
            res.send(success(action));
        } catch(e) {
            // console.log(e);
            res.send(fail('cantGetActionById'));
        }
    }

    async getActionWithCoupons(req, res) {
        try {
            const { id }  = req.query;
            const action = await Action.findOne({
                where: {
                    id,
                },
                include: [{
                    model: Coupon,
                    as: 'coupons',
                },
                {
                    model: Category,
                    as: 'category',
                },
                ],
            });

            res.json(success(action));
        } catch(err) {
            res.json(fail(err.toString()));
        }
    }
}

export default new CpController();
