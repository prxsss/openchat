import express from 'express';
import * as chatController from '../controllers/chatController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

// router.get('/', protectRoute, chatController.getUserChats);
router.get('/', protectRoute, chatController.searchChatsByUserFullName);
router.get('/:friendId', protectRoute, chatController.getUserChat);

export default router;
