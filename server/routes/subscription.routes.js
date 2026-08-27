import express from 'express';
import {
  getSubscriptions,
  getSubscriptionStatus,
  getCreatorSubscriptions,
  setSubscriberDisabled,
  subscribeToPackage,
} from '../controllers/subscription.controller.js';
import { protect, creatorOnly, subscriberOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, subscriberOnly, getSubscriptions);
router.post('/subscribe', protect, subscriberOnly, subscribeToPackage);
router.get('/status', protect, subscriberOnly, getSubscriptionStatus);
router.get('/creator', protect, creatorOnly, getCreatorSubscriptions);
router.patch(
  '/creator/subscribers/:subscriberId',
  protect,
  creatorOnly,
  setSubscriberDisabled
);

export default router;
