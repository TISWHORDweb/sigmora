import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const tradeSchema = new mongoose.Schema({
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true,
  },
  type: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: true,
  },
  pip: {
    type: Number,
    required: true,
  },
  spread: {
    type: Number,
    required: true,
  },
  takeProfit: {
    type: Number,
    required: true,
  },
  stopLoss: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active',
  },
  closedAt: {
    type: Date,
  },
  closeReason: {
    type: String,
    enum: ['TP', 'SL', 'Manual'],
    default: null,
  },
  packages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: true,
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  acknowledgements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Trade = mongoose.models.Trade || mongoose.model('Trade', tradeSchema);

export default Trade;
