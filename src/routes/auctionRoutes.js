import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { createAuction,getAllAuctions, getAuction, bidOnAuction, getTopBids } from '../controllers/auctionController.js';

const router = express.Router();

router.post('/', authenticate, createAuction);
router.get('/', getAllAuctions);
router.get('/:id', getAuction);
router.post('/:id/bid', authenticate, bidOnAuction);
router.get('/top', getTopBids);

export default router;