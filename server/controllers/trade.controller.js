import Trade from '../models/Trade.model.js';
import Subscription from '../models/Subscription.model.js';
import { validationResult } from 'express-validator';
import { notifyTradeSubscribersAsync } from '../utils/notifications.js';

async function getSubscribedPackageIds(subscriberId, { activeOnly = false } = {}) {
  const query = { subscriber: subscriberId };
  if (activeOnly) {
    query.status = 'active';
    query.expiryDate = { $gt: new Date() };
  }
  const subscriptions = await Subscription.find(query);
  return [...new Set(subscriptions.map((s) => s.package.toString()))];
}

function idStr(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (value._id) return value._id.toString();
  return value.toString();
}

function serializeTradeForViewer(trade, userId) {
  const obj = typeof trade.toObject === 'function' ? trade.toObject() : { ...trade };
  const uid = idStr(userId);
  const likes = (obj.likes || []).map(idStr);
  const acks = (obj.acknowledgements || []).map(idStr);
  return {
    ...obj,
    likeCount: likes.length,
    acknowledgeCount: acks.length,
    commentCount: (obj.comments || []).length,
    likedByMe: likes.includes(uid),
    acknowledgedByMe: acks.includes(uid),
  };
}

async function subscriberCanAccessTrade(user, trade) {
  if (!user?.subscribedTo) return false;
  if (idStr(trade.creator) !== idStr(user.subscribedTo)) return false;
  const activeOnly = trade.status === 'active';
  const packageIds = await getSubscribedPackageIds(user._id, { activeOnly });
  if (packageIds.length === 0) return false;
  return (trade.packages || []).some((p) => packageIds.includes(idStr(p)));
}

const ENGAGEMENT_POPULATE = [
  { path: 'asset', select: 'symbol pipValue spread margin' },
  { path: 'packages', select: 'name price' },
  { path: 'creator', select: 'creatorName' },
  { path: 'comments.user', select: 'name' },
];

async function loadTradeForEngagement(id) {
  return Trade.findById(id).populate(ENGAGEMENT_POPULATE);
}

export const createTrade = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { asset, type, pip, spread, takeProfit, stopLoss, packages } = req.body;

    const trade = await Trade.create({
      asset,
      type,
      pip,
      spread,
      takeProfit,
      stopLoss,
      packages,
      creator: req.user._id,
    });

    const populatedTrade = await Trade.findById(trade._id)
      .populate('asset', 'symbol pipValue spread margin')
      .populate('packages', 'name price');

    notifyTradeSubscribersAsync(trade._id, 'created');

    res.status(201).json(populatedTrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getActiveTrades = async (req, res) => {
  try {
    const trades = await Trade.find({
      creator: req.user._id,
      status: 'active',
    })
      .populate('asset', 'symbol pipValue spread margin')
      .populate('packages', 'name price')
      .sort({ createdAt: -1 });

    res.json(
      trades.map((t) => ({
        ...t.toObject(),
        likeCount: (t.likes || []).length,
        acknowledgeCount: (t.acknowledgements || []).length,
        commentCount: (t.comments || []).length,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompletedTrades = async (req, res) => {
  try {
    const trades = await Trade.find({
      creator: req.user._id,
      status: 'closed',
    })
      .populate('asset', 'symbol pipValue spread margin')
      .populate('packages', 'name price')
      .sort({ closedAt: -1 });

    res.json(
      trades.map((t) => ({
        ...t.toObject(),
        likeCount: (t.likes || []).length,
        acknowledgeCount: (t.acknowledgements || []).length,
        commentCount: (t.comments || []).length,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubscriberActiveTrades = async (req, res) => {
  try {
    if (!req.user.subscribedTo) {
      return res.json([]);
    }

    const packageIds = await getSubscribedPackageIds(req.user._id, { activeOnly: true });
    if (packageIds.length === 0) {
      return res.json([]);
    }

    const trades = await Trade.find({
      status: 'active',
      creator: req.user.subscribedTo,
      packages: { $in: packageIds },
    })
      .populate(ENGAGEMENT_POPULATE)
      .sort({ createdAt: -1 });

    res.json(trades.map((t) => serializeTradeForViewer(t, req.user._id)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubscriberCompletedTrades = async (req, res) => {
  try {
    if (!req.user.subscribedTo) {
      return res.json([]);
    }

    const packageIds = await getSubscribedPackageIds(req.user._id, { activeOnly: false });
    if (packageIds.length === 0) {
      return res.json([]);
    }

    const trades = await Trade.find({
      status: 'closed',
      creator: req.user.subscribedTo,
      packages: { $in: packageIds },
    })
      .populate(ENGAGEMENT_POPULATE)
      .sort({ closedAt: -1 });

    res.json(trades.map((t) => serializeTradeForViewer(t, req.user._id)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const acknowledgeTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (!trade) return res.status(404).json({ message: 'Trade not found' });

    const allowed = await subscriberCanAccessTrade(req.user, trade);
    if (!allowed) return res.status(403).json({ message: 'Not authorized' });

    const uid = req.user._id.toString();
    const already = (trade.acknowledgements || []).some((id) => idStr(id) === uid);
    if (!already) {
      trade.acknowledgements.push(req.user._id);
      await trade.save();
    }

    const populated = await loadTradeForEngagement(trade._id);
    res.json(serializeTradeForViewer(populated, req.user._id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleTradeLike = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (!trade) return res.status(404).json({ message: 'Trade not found' });

    const allowed = await subscriberCanAccessTrade(req.user, trade);
    if (!allowed) return res.status(403).json({ message: 'Not authorized' });

    const uid = req.user._id.toString();
    const idx = (trade.likes || []).findIndex((id) => idStr(id) === uid);
    if (idx >= 0) {
      trade.likes.splice(idx, 1);
    } else {
      trade.likes.push(req.user._id);
    }
    await trade.save();

    const populated = await loadTradeForEngagement(trade._id);
    res.json(serializeTradeForViewer(populated, req.user._id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const commentOnTrade = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const text = String(req.body.text || '').trim();
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const trade = await Trade.findById(req.params.id);
    if (!trade) return res.status(404).json({ message: 'Trade not found' });

    const allowed = await subscriberCanAccessTrade(req.user, trade);
    if (!allowed) return res.status(403).json({ message: 'Not authorized' });

    trade.comments.push({
      user: req.user._id,
      text,
      createdAt: new Date(),
    });
    await trade.save();

    const populated = await loadTradeForEngagement(trade._id);
    res.status(201).json(serializeTradeForViewer(populated, req.user._id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const closeTrade = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { closeReason } = req.body;

    if (!['TP', 'SL', 'Manual'].includes(closeReason)) {
      return res.status(400).json({ message: 'Invalid close reason' });
    }

    const trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({ message: 'Trade not found' });
    }

    if (trade.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (trade.status === 'closed') {
      return res.status(400).json({ message: 'Trade is already closed' });
    }

    trade.status = 'closed';
    trade.closeReason = closeReason;
    trade.closedAt = new Date();

    const updatedTrade = await trade.save();
    const populatedTrade = await Trade.findById(updatedTrade._id)
      .populate('asset', 'symbol pipValue spread margin')
      .populate('packages', 'name price');

    notifyTradeSubscribersAsync(updatedTrade._id, 'closed');

    res.json(populatedTrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id)
      .populate('asset', 'symbol pipValue spread margin')
      .populate('packages', 'name price')
      .populate('creator', 'creatorName email')
      .populate('comments.user', 'name');

    if (!trade) {
      return res.status(404).json({ message: 'Trade not found' });
    }

    res.json(serializeTradeForViewer(trade, req.user._id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
