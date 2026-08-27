'use client';

import { useState } from 'react';
import { Check, Heart, MessageCircle, Send } from 'lucide-react';
import { tradeService } from '../../services/tradeService';
import { getApiErrorMessage } from '../../utils/apiErrors';
import toast from 'react-hot-toast';

const TradeEngagement = ({ trade, onUpdated }) => {
  const [busy, setBusy] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const comments = Array.isArray(trade.comments) ? trade.comments : [];

  const run = async (key, action) => {
    if (busy) return;
    setBusy(key);
    try {
      const updated = await action();
      onUpdated?.(updated);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Action failed'));
    } finally {
      setBusy(null);
    }
  };

  const handleAcknowledge = () => {
    if (trade.acknowledgedByMe) return;
    run('ack', () => tradeService.acknowledgeTrade(trade._id));
  };

  const handleLike = () => {
    run('like', () => tradeService.toggleTradeLike(trade._id));
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const text = comment.trim();
    if (!text || submittingComment) return;
    setSubmittingComment(true);
    try {
      const updated = await tradeService.commentOnTrade(trade._id, text);
      setComment('');
      setShowComments(true);
      onUpdated?.(updated);
      toast.success('Comment posted');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to comment'));
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <div className="cr-engage">
      <div className="cr-engage-actions">
        <button
          type="button"
          className={`cr-engage-btn ${trade.acknowledgedByMe ? 'is-on ack' : ''}`}
          onClick={handleAcknowledge}
          disabled={busy === 'ack' || trade.acknowledgedByMe}
          title={trade.acknowledgedByMe ? 'Acknowledged' : 'Acknowledge signal'}
        >
          <Check size={15} />
          <span>{trade.acknowledgedByMe ? 'Acknowledged' : 'Acknowledge'}</span>
          {(trade.acknowledgeCount || 0) > 0 && (
            <em>{trade.acknowledgeCount}</em>
          )}
        </button>
        <button
          type="button"
          className={`cr-engage-btn ${trade.likedByMe ? 'is-on like' : ''}`}
          onClick={handleLike}
          disabled={busy === 'like'}
          title={trade.likedByMe ? 'Unlike' : 'Like'}
        >
          <Heart size={15} fill={trade.likedByMe ? 'currentColor' : 'none'} />
          <span>Like</span>
          {(trade.likeCount || 0) > 0 && <em>{trade.likeCount}</em>}
        </button>
        <button
          type="button"
          className={`cr-engage-btn ${showComments ? 'is-on' : ''}`}
          onClick={() => setShowComments((v) => !v)}
          title="Comments"
        >
          <MessageCircle size={15} />
          <span>Comment</span>
          {(trade.commentCount || comments.length) > 0 && (
            <em>{trade.commentCount || comments.length}</em>
          )}
        </button>
      </div>

      {showComments && (
        <div className="cr-engage-comments">
          {comments.length === 0 ? (
            <p className="cr-engage-comments__empty">No comments yet — start the thread.</p>
          ) : (
            <ul className="cr-engage-comments__list">
              {comments.map((c) => (
                <li key={c._id || `${c.user?._id}-${c.createdAt}`}>
                  <strong>{c.user?.name || 'Subscriber'}</strong>
                  <span>{c.text}</span>
                  <time>
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                  </time>
                </li>
              ))}
            </ul>
          )}
          <form className="cr-engage-comments__form" onSubmit={handleComment}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment…"
              maxLength={500}
              disabled={submittingComment}
            />
            <button type="submit" disabled={submittingComment || !comment.trim()} aria-label="Send comment">
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TradeEngagement;
