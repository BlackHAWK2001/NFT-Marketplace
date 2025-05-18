import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },  // URL 
    dateOfBirth: { type: Date },
    dateJoined: { type: Date, default: Date.now },
    nftLikes: [
        {
            nftId: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT' },
            timestamp: { type: Date, default: Date.now },
        },
    ],
    walletTransfers: [
        {
            amount: { type: Number, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
    auctionBids: [
        {
            auctionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction' },
            bidAmount: { type: Number, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],

});

const User = mongoose.model("User",UserSchema);

export default User;
