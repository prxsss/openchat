import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import * as messageController from '../controllers/messageConfroller.js';

const router = express.Router();

router.get('/:receiverId', protectRoute, messageController.getMessages);
router.post('/send/:receiverId', protectRoute, messageController.sendMessage);

export default router;
