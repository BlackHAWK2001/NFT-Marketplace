import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nfts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NFT' }],
    dateCreated: { type: Date, default: Date.now }
});
  
const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;