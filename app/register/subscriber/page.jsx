'use client';
import { Navigate } from '../../../src/lib/router';
export default function Page() {
  return <Navigate to="/register?role=subscriber" replace />;
}
