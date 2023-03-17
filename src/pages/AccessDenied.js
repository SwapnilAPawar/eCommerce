import React from "react";
import { NavLink } from "react-router-dom";
import { PageHeader } from "../components";
const AccessDenied = () => {
  return (
    <React.Fragment>
      <PageHeader title="Access Denied"></PageHeader>
      <p>You do not have permission to access this page. Please contact the system administrator to request access.</p>
      <NavLink className="btn btn-primary" to="/home">
        Home
      </NavLink>
    </React.Fragment>
  );
};

export default AccessDenied;
