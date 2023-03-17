import React from "react";
import * as yup from "yup";
export const LoginSchema = yup.object().shape({
  email: yup.string().required("Required").email("Invalid"),
  password: yup
    .string()
    .required("Required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Minimum 8 chars, 1 uppercase, 1 Lowercase, 1 number and 1 symbol."),
});
