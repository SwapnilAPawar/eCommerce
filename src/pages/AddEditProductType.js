import React, { useEffect, useState } from "react";
import { AddEditSpecifications, PageHeader, TextField } from "../components";
import { Formik, Form } from "formik";
import ProductTypeValidation from "../validations/ProductTypeValidation";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveProductType, updateProductType } from "../reducers/ProductTypeReducer";

const AddEditProductType = () => {
  const { producttypeid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productTypes } = useSelector((state) => state);
  let productType = productTypes?.productTypeList?.find((productType) => productType.id === +producttypeid);
  return (
    <Formik
      initialValues={productType || { id: 0, name: "", specs: [] }}
      validationSchema={ProductTypeValidation}
      onSubmit={(vals) => {
        if (!producttypeid) {
          dispatch(saveProductType(vals));
        } else {
          dispatch(updateProductType(vals));
        }
        navigate("/manage/producttypes");
      }}
    >
      {(formik) => (
        <React.Fragment>
          <PageHeader title={!producttypeid ? "New Product Type" : "Edit Product Type"} />
          <Form className="row g-3 col-md-6">
            <input type="hidden" name="id" id="id" />
            <TextField id="name" name="name" placeholder="Enter name" label="Name" showLabel={true} />
            {console.log("prodTypes::", formik.values.specs)}
            <AddEditSpecifications specs={formik.values.specs} />

            <div className="col-12">
              <button type="submit" className="btn btn-primary" disabled={!(formik.isValid && formik.dirty)}>
                {!producttypeid ? "Save" : "Update"}
              </button>
              <NavLink className="btn btn-link ms-1" to="/manage/producttypes">
                Cancel
              </NavLink>
            </div>
          </Form>
        </React.Fragment>
      )}
    </Formik>
  );
};
export default AddEditProductType;
