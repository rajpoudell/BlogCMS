// components/ProtectedRoute.tsx
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = !!localStorage.getItem("token"); // or use auth context/store

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
