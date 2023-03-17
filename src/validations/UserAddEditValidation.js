import * as yup from "yup";
import { EmailValidation, FirstNameValidation, LastNameValidation, PasswordValidation } from "./CommonValidations";

export const UserAddEditSchema = yup.object().shape({
  id: yup.number(),
  ...FirstNameValidation,
  ...LastNameValidation,
  ...EmailValidation,
  ...PasswordValidation,
  locked: yup.boolean(),
  createdOn: yup.date().default(() => new Date()),
});
