import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },  
    walletId: { type: String, required: true, unique: true, default: () => generateUniqueWalletId() }, 
    balance: { type: Number, default: 100 },
    currency: { type: String, default: 'BTC' },
  }, {
    timestamps: true  
});
  
  
function generateUniqueWalletId() {
    return `wallet-${Math.random().toString(36).substr(2, 9)}`;
}
  
const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;