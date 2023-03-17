import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import useHasPermissions from "../hooks/useHasPermissions";

export const PrivateRoute = (props) => {
  const { currentUser } = useCurrentUser();
  const canClaim = useHasPermissions(props.feature || props.features);

  if (!currentUser || !currentUser.isAuthenticated) {
    return <Navigate to={{ pathname: "/login" }} />;
  }

  //check access to feature
  if (!canClaim) {
    return <Navigate to={{ pathname: "/accessdenied" }} />;
  }
  return <Outlet />;
};
