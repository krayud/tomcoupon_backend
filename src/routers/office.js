import cpController from "../controllers/cpController";

var express = require('express');
var router = express.Router();

import officeController from '../controllers/officeController.js';
import couponController from '../controllers/couponController.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

router.post('/closeCoupon', roleMiddleware([1, 2]), couponController.closeCoupon);
router.get('/getAllMyActions', roleMiddleware([1, 2]), officeController.getAllMyActions);
router.get('/getMyActionCoupons', roleMiddleware([1, 2]), officeController.getMyActionCoupons);

export default router;
