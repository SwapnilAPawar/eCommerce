import React from "react";
const PageLoader = () => {
  return (
    <React.Fragment>
      <div className="modal-backdrop fade show"></div>
      <div className="position-absolute top-50 start-50 translate-middle spin-z-index">
        <div className="spinner-border text-white" role="status"></div>
        <span className="text-white fs-1">Loading... </span>
      </div>
    </React.Fragment>
  );
};

export default PageLoader;
