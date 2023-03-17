import React from "react";
import * as yup from "yup";
const ProductTypeValidation = yup.object().shape({
  name: yup.string().required("Required"),
  specs: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Required"),
      type: yup.string().required("Required"),
    })
  ),
});
export default ProductTypeValidation;
