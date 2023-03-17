import React from "react";
import * as yup from "yup";

export const ProductAddCartValidation = yup.object().shape({
  productId: yup.string(),
  specifications: yup.array().of(
    yup.object().shape({
      id: yup.string().required("Required"),
      name: yup.string().required("Required"),
      value: yup.string().required("Required"),
    })
  ),
  quantity: yup.number().required("Required"),
});
