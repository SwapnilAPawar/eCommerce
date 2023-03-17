import React from "react";
import * as yup from "yup";
import { ConfirmEmailValidation, EmailValidation, FirstNameValidation, LastNameValidation, PasswordValidation } from "./CommonValidations";

export const RegisterSchema = yup.object().shape({
  ...FirstNameValidation,
  ...LastNameValidation,
  ...EmailValidation,
  ...PasswordValidation,
  ...ConfirmEmailValidation,
});
