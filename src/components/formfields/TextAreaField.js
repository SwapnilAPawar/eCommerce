import React from "react";
import { useField } from "formik";
import { Form } from "react-bootstrap";
export const TextAreaField = ({ label, showLabel, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group md="6" className="mb-3">
      {showLabel && <Form.Label htmlFor={field.name}>{label}</Form.Label>}
      <Form.Control as="textarea" autoComplete="off" {...field} {...props} isValid={meta.touched && !meta.error} isInvalid={!!meta.touched && meta.error} />
      <Form.Control.Feedback as="div" type="invalid" className="error">
        {meta.error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
