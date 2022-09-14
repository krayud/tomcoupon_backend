import moment from "moment";
import { success, fail } from '../helpers/responseGenerator.js';
import { Coupon, Action } from '../models';
import { getCurrentTimestamp } from "../helpers/date";
import { USER_ROLES } from "../conf/main.js";

class couponController {

    async closeCoupon(req, res) {
        try {
            const { id } = req.body;
            const { userRole, userId } = res.locals;
            const time = getCurrentTimestamp();

            if (userRole === USER_ROLES.ADMIN) {
                await Coupon.update({
                        isActive: false,
                        closedDate: time,
                    },
                    {
                        where: {
                            id,
                        }
                    });
                res.send(success({ closedDate: time }));
                return;
            }

            if (userRole === USER_ROLES.PROVIDER) {
                const candidate = await Coupon.findOne({
                    where: {
                        id,
                    },
                    include: [{
                        model: Action,
                        as: 'action',
                    }],
                });
                if (candidate.action.userId === userId) {
                    await Coupon.update({
                            isActive: false,
                            closedDate: time,
                        },
                    {
                        where: {
                            id,
                        }
                    });
                    res.send(success({ closedDate: time }));
                    return;
                } else {
                    res.send(fail('cantCloseCoupon'));
                    return
                }
            }

            res.send(fail('cantCloseCoupon'));
        } catch(e) {
            // console.log(e);
            res.send(fail('cantCloseCoupon'));
        }
    }
}

export default new couponController();
