import React from "react";
import { FieldArray } from "formik";
import { SelectField, TextField } from ".";
const AddEditSpecifications = (props) => {
  const dataTypes = [
    { value: "text", label: "String" },
    { value: "number", label: "Number" },
    { value: "dropdown", label: "Dropdown List" },
  ];
  const { specs } = props;
  const hasAddProductTypeSpecificationAccess = true;
  console.log(specs);
  return (
    <FieldArray
      name="specs"
      render={(arrayHelpers) => (
        <div className="mt-4">
          <div className="d-flex justify-content-between">
            <h5 className="mt-2">Specifications</h5>
            <div className="text-center">&nbsp;</div>
          </div>
          <hr className="mb-0" />
          <table className="table table-borderless">
            <thead>
              <tr>
                <th className="col-4 align-middle">Name</th>
                <th className="col-4 align-middle">Type</th>
                <th className="col-4 align-middle text-end">
                  {hasAddProductTypeSpecificationAccess && (
                    <button className="btn btn-primary" type="button" onClick={() => arrayHelpers.push({ name: "", type: "" })}>
                      <i className="fa fa-plus"></i>
                      <span className="d-none d-sm-inline">&nbsp;Add New</span>
                    </button>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {specs &&
                specs.length > 0 &&
                specs.map((s, i) => (
                  <tr key={i}>
                    <td className="col-4 align-middle">
                      <TextField key={i} id={`specs[${i}].name`} name={`specs[${i}].name`} placeholder="Name" showLabel={false} />
                    </td>
                    <td className="col-4 align-middle">
                      <SelectField key={i} id={`specs[${i}].type`} name={`specs[${i}].type`} options={dataTypes} showLabel={false} label="Type" />
                    </td>
                    <td className="col-4 align-top text-end">
                      {hasAddProductTypeSpecificationAccess && (
                        <button key={i} id={"del_" + i} name={"del_" + i} className="btn btn-primary" onClick={() => arrayHelpers.remove(i)}>
                          <i className="fa fa-trash"></i>
                          <span className="d-none d-sm-inline">&nbsp;Delete</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              {(!specs || specs.length <= 0) && (
                <tr>
                  <td colSpan="3">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    />
  );
};

export default AddEditSpecifications;
