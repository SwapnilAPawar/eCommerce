import React from "react";
import { useField } from "formik";
import { Form } from "react-bootstrap";
export const SelectField = ({ label, showLabel, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group md="6" className="mb-3">
      {showLabel && <Form.Label htmlFor={field.name}>{label}</Form.Label>}
      <Form.Select autoComplete="off" {...field} {...props} isValid={meta.touched && !meta.error} isInvalid={!!meta.touched && meta.error}>
        <option key="-1" value="">
          Select {label}
        </option>
        {options.length > 0 &&
          options.map((o, i) => (
            <option key={i} value={o.value}>
              {o.label}
            </option>
          ))}
      </Form.Select>
      <Form.Control.Feedback as="div" type="invalid" className="error">
        {meta.error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
