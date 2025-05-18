import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {getWallet,transferFunds} from '../controllers/walletController.js';

const router = express.Router();

router.get('/', authenticate, getWallet);
router.post('/transfer', authenticate, transferFunds);

export default router;
