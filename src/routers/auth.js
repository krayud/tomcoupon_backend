const express = require('express');
const router = express.Router();

import authController from '../controllers/authController.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.get('/get', roleMiddleware([1]), authController.get);


export default router;
