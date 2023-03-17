import React from "react";
import * as yup from "yup";

export const ProductAddEditValidation = yup.object().shape({
  id: yup.string(),
  name: yup.string().required("Required").min(2).max(150),
  description: yup.string().required("Required").max(500),
  price: yup.string().required("Required").max(500),
  discount: yup.number().required("Required"),
  availableQuantity: yup.number().required("Required"),
  type: yup.string().required("Required"),
  brand: yup.string().required("Required"),
  specifications: yup.array().of(
    yup.object().shape({
      id: yup.string().required("Required"),
      name: yup.string().required("Required"),
      value: yup.string().required("Required"),
    })
  ),
});
