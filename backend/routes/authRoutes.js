import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.get('/logout', authController.logout);
router.post('/signup', authController.signUp);
router.post('/login', authController.login);

export default router;
