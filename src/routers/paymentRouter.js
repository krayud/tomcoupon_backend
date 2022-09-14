import actionController from "../controllers/actionController";

const express = require('express');
const router = express.Router();
import paymentController from '../controllers/paymentController.js';


// router.get('/result', paymentController.result);
router.post('/intellectmoneyResult', paymentController.intellectmoneyResult);
// router.get('/getPaymentUrl', paymentController.getPaymentUrl);
router.get('/getPaymentData', paymentController.getPaymentData);

export default router;
