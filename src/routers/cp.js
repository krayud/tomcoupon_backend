var express = require('express');
var router = express.Router();

import cpController from '../controllers/cpController.js';
import couponController from '../controllers/couponController.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

router.post('/testCPAPI', roleMiddleware([1]), cpController.testCPAPI);
router.post('/addNewAction', roleMiddleware([1]), cpController.addNewAction);
router.post('/addNewCoupon', roleMiddleware([1]), cpController.addNewCoupon);
router.post('/updateAction', roleMiddleware([1]), cpController.updateAction);
router.post('/closeCoupon', roleMiddleware([1]), couponController.closeCoupon);
router.post('/switchActionActive', roleMiddleware([1]), cpController.switchActionActive);

router.get('/getAllActions', roleMiddleware([1]), cpController.getAllActions);
router.get('/getAllCouponsForAction', roleMiddleware([1]), cpController.getAllCouponsForAction);
router.get('/getActionById', roleMiddleware([1]), cpController.getActionById);
router.get('/getActionWithCoupons', roleMiddleware([1]), cpController.getActionWithCoupons);

export default router;
