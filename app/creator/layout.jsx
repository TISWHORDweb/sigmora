'use client';

import ProtectedRoute from '../../src/components/common/ProtectedRoute';

export default function CreatorLayout({ children }) {
  return <ProtectedRoute role="creator">{children}</ProtectedRoute>;
}
