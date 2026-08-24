'use client';
import { Navigate } from '../../../src/lib/router';
export default function Page() {
  return <Navigate to="/creator/dashboard?view=assets" replace />;
}
