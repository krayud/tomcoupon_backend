import {Action, Category, Coupon} from '../models';
import { success, fail } from '../helpers/responseGenerator.js';
import md5 from 'md5';
import {IS_REAL_PAYMENT, SECRET_KEY, SHOP_ID} from '../conf/main';
import { getCurrentDate, getCurrentTimestamp } from '../helpers/date.js';
const { Op } = require('sequelize');
import TGBot from '../helpers/TGBot.js';
import axios from "axios";
import {generateCoupon} from "../helpers/couponGenerator";


const sendSMS = (phone, text) => {
    return axios.get(`https://abuse2512@mail.ru:8RF4ngDtLwaPqVpAxvcd0P6NcAe@gate.smsaero.ru/v2/sms/send?number=7${phone}&text=${encodeURI(text)}&sign=SMS Aero`);
}
// INTELLEGE MONEY >

class paymentController {

    // < INTELLEGE MONEY
    async getPaymentData(req, res) {
        const { id } = req.query;
        const currentDate = getCurrentDate();
        const actionInfo = await Action.findOne({
            where: {
                id,
                isActive: true,
                endDate: {
                    [Op.gte]: currentDate,
                },
                startDate: {
                    [Op.lte]: currentDate,
                },
            },
        });
        if (!actionInfo) {
            res.json(fail('notFoundActionForPayment'));
            return;
        }

        const orderId = getCurrentTimestamp();
        const recipientCurrency = IS_REAL_PAYMENT ? 'RUB' : 'TST';

        const hash = md5(`${SHOP_ID}::${orderId}::${actionInfo.title}::${actionInfo.price}::${recipientCurrency}::${SECRET_KEY}`);
        const paymentData = {
            orderId,
            actionId: actionInfo.id,
            recipientCurrency,
            hash,
            eshopId: SHOP_ID,
            serviceName: actionInfo.title,
            recipientAmount: actionInfo.price,
        };
        res.json(success(paymentData));
    }

    async intellectmoneyResult(req, res) {
        const {
            eshopId,
            orderId,
            serviceName,
            eshopAccount,
            recipientAmount,
            recipientCurrency,
            paymentStatus,
            userName,
            userEmail,
            paymentData,
            UserField_1,
            UserField_2,
            hash,
        } = req.body;
        const calcHash = md5(`${eshopId}::${orderId}::${serviceName}::${eshopAccount}::${recipientAmount}::${recipientCurrency}::${paymentStatus}::${userName}::${userEmail}::${paymentData}::${SECRET_KEY}`);
        if (paymentStatus == 5) {
            if (calcHash === hash) {
                if (IS_REAL_PAYMENT) {
                    try {
                        const time = getCurrentTimestamp();
                        const newCouponNumber = generateCoupon();
                        await Coupon.create({
                            actionId: UserField_2,
                            buyerPhone: UserField_1,
                            buyerEmail: userEmail,
                            createdDate: time,
                            number: newCouponNumber,
                        });
                        sendSMS(UserField_1, `tomcoupon.ru Номер вашего купона: ${newCouponNumber}`);
                        TGBot.telegram.sendMessage(876166922, `Принят платеж ${recipientAmount}. Купон ${newCouponNumber}`);
                    } catch(e) {
                        TGBot.telegram.sendMessage(876166922, `Платеж не удался`);
                    }

                } else {
                    TGBot.telegram.sendMessage(876166922, `Тестовый платеж прошел, без отправки смс`);
                }
            } else {
                TGBot.telegram.sendMessage(876166922, `Не сошлись хеши`);
            }
        }
        res.send('OK');
    }
    // INTELLEGE MONEY >
}

export default new paymentController();
