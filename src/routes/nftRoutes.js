import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { getAllNFTs,getNFT, createNFT, updateNFT, deleteNFT, likeNFT, unlikeNFT } from '../controllers/nftController.js';

const router = express.Router();

router.get('/', getAllNFTs);
router.get('/:id', getNFT);
router.post('/', authenticate, createNFT);
router.put('/:id', authenticate, updateNFT);
router.delete('/:id', authenticate, deleteNFT);
router.post('/:id/like', authenticate, likeNFT);
router.post('/:id/unlike', authenticate, unlikeNFT);




export default router;