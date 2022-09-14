const express = require('express');
const router = express.Router();
import actionController from '../controllers/actionController.js';


router.get('/getActualActions', actionController.getActualActions);
router.get('/getActionById', actionController.getActionById);

export default router;
