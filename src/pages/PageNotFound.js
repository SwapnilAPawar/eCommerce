import React from "react";
import { NavLink } from "react-router-dom";
import { PageHeader } from "../components";
const PageNotFound = () => {
  return (
    <React.Fragment>
      <PageHeader title="Page Not Found"></PageHeader>
      <p>It seems that the page you are looking for doesn't exist. Please check the url and try again. Or please contact the system administrator.</p>
      <NavLink className="btn btn-primary" to="/home">
        Home
      </NavLink>
    </React.Fragment>
  );
};

export default PageNotFound;
