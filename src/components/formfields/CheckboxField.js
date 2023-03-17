import React from "react";
import { useField } from "formik";
import { Form } from "react-bootstrap";
export const CheckboxField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <Form.Check type="checkbox" {...field} {...props} label={label} />
    </div>
  );
};
