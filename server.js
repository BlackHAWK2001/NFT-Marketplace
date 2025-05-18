import cors from 'cors';
import express from 'express';
import { connectDB } from './src/config/db.js';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import walletRoutes from './src/routes/walletRoutes.js';
import nftRoutes from './src/routes/nftRoutes.js';
import auctionRoutes from './src/routes/auctionRoutes.js';

dotenv.config();

const app = express();
const PORT = 5555;

connectDB();

// ✅ Allow larger payloads (e.g. 50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/wallets', walletRoutes);
app.use('/api/v1/nfts', nftRoutes);
app.use('/api/v1/auctions', auctionRoutes);

app.get('/', (req, res) => {
  res.json('Hello from API!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
