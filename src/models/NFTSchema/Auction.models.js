import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
    nft: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT', required: true },
    startingPrice: { type: Number, required: true },
    currentBid: { type: Number, default: 0 },
    endTime: { type: Date, required: true },
    bids: [{
      bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      amount: { type: Number, required: true },
      dateBid: { type: Date, default: Date.now }
    }],
});
  
const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;