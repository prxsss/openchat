import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// router.get('/', protectRoute, userController.getUsers);
router.get('/', protectRoute, userController.searchUserByFullName);

export default router;
