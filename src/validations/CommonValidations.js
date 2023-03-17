import * as yup from "yup";

export const FirstNameValidation = {
  firstName: yup.string().required("Required").min(2, "Minimum 2 characters required.").max(50, "Upto 50 characters allowed."),
};

export const LastNameValidation = {
  firstName: yup.string().required("Required").min(2, "Minimum 2 characters required.").max(50, "Upto 50 characters allowed."),
};

export const EmailValidation = {
  email: yup.string().email("Invalid.").required("Required"),
};

export const PasswordValidation = {
  password: yup
    .string()
    .required("Required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Minimum 8 chars, 1 uppercase, 1 Lowercase, 1 number and 1 symbol."),
};

export const ConfirmEmailValidation = {
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Must match password."),
};
