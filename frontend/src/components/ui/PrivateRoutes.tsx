// components/PrivateRoutes.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/authContext";

export default function PrivateRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
