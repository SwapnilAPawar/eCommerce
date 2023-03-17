import React from "react";
import { FieldArray } from "formik";
import { TextField } from "../components";
import { Form } from "react-bootstrap";
const DisplaySpecifications = (props) => {
  let specs = [...props.specs];
  console.log(specs);
  return (
    <FieldArray
      name="specs"
      render={() => (
        <div className="mt-4">
          <div className="d-flex justify-content-between">
            <h5 className="mt-2">Specifications</h5>
            <div className="text-center">&nbsp;</div>
          </div>
          <hr className="mb-0" />
          <table className="table table-borderless">
            <tbody>
              {specs &&
                specs.length > 0 &&
                specs.map((s, i) => {
                  {
                    /* specs[i].value = specs[i].value ?? ""; */
                  }
                  return (
                    <tr key={i}>
                      <td className="col-3 align-middle">
                        <Form.Label key={i} id={`specs[${i}].name`} name={`specs[${i}].name`}>
                          {specs[i].name}
                        </Form.Label>
                      </td>
                      <td className="col-9 align-middle">
                        <TextField key={i} type="text" id={`specs[${i}].value`} name={`specs[${i}].value`} placeholder={specs[i].name} showLabel={false} />
                      </td>
                    </tr>
                  );
                })}
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

export default DisplaySpecifications;
