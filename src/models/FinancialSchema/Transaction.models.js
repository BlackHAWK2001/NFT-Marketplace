import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    senderWalletId: { type: String, required: true },
    receiverWalletId: { type: String, required: true },  
    amount: { type: Number, required: true },
    type: { type: String, enum: ['transfer', 'deposit', 'withdrawal'], required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },  
});
  
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;