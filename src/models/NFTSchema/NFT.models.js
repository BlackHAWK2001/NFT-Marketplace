import mongoose from "mongoose";

const nftSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    auctionEndTime: { type: Date, required: true },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' },
    image: { type: String },  
});
  
const NFT = mongoose.model('NFT', nftSchema);

export default NFT;