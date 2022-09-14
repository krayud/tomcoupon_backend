const express = require('express');
const router = express.Router();

import categoryController from '../controllers/categoryController.js';

router.get('/getAll', categoryController.getAll)

export default router;
