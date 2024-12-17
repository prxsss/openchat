import express from 'express';
import * as friendController from '../controllers/friendController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, friendController.getFriends);
router.get('/requests', protectRoute, friendController.getFriendRequests);
router.get('/:friendId', protectRoute, friendController.getFriend);
router.post('/request', protectRoute, friendController.sendFriendRequest);
router.post('/accept', protectRoute, friendController.acceptFriendRequest);
router.post('/reject', protectRoute, friendController.rejectFriendRequest);
router.delete(
  '/requests/:receiverId',
  protectRoute,
  friendController.cancelFriendRequest
);
router.delete('/:friendId', protectRoute, friendController.removeFriend);

export default router;
