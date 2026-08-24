'use client';

import ProtectedRoute from '../../src/components/common/ProtectedRoute';

export default function SubscriberLayout({ children }) {
  return <ProtectedRoute role="subscriber">{children}</ProtectedRoute>;
}
