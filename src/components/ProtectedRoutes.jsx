import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoutes = ({ user }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
