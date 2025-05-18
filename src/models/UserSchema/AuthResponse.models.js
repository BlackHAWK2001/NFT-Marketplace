import mongoose from "mongoose";

const authResponseSchema = new mongoose.Schema({
    token: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
  
const AuthResponse = mongoose.model('AuthResponse', authResponseSchema);

export default AuthResponse;