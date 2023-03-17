import React from "react";
const PageHeader = (props) => {
  return (
    <React.Fragment>
      <h1>{props.title}</h1>
      <hr></hr>
    </React.Fragment>
  );
};
export default PageHeader;
