import roleMiddleware from "../middleware/roleMiddleware";

const express = require('express');
const router = express.Router();

import userController from "../controllers/userController";

router.get('/getAllUsers', roleMiddleware([1]), userController.getAllUsers);
router.post('/addNewUser', roleMiddleware([1]), userController.addNewUser);

export default router;
