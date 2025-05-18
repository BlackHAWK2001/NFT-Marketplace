import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followed: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateFollowed: { type: Date, default: Date.now },
});

const Follow = mongoose.model('Follow', followSchema);
export default Follow;