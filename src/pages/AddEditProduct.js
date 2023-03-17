import React from "react";
import { ProductAddEditValidation } from "../validations/ProductAddEditValidation";
import { Formik, Form } from "formik";
import { DisplaySpecifications, PageHeader, SelectField, TextField } from "../components";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextAreaField } from "../components/formfields/TextAreaField";
import { saveProduct, updateProduct } from "../reducers/ProductReducer";

const AddEditProduct = () => {
  const { productid } = useParams();
  const dispatch = useDispatch();
  const { products, productTypes } = useSelector((state) => state);
  const navigate = useNavigate();

  const product = products?.productList?.find((product) => +product.id === +productid) || {};
  console.log(product);
  const types = productTypes.productTypeList.map((type) => {
    return { value: type.id, label: type.name };
  });

  return (
    <Formik
      initialValues={{
        id: productid ? productid : 0,
        name: productid ? product.name : "",
        description: productid ? product.description : "",
        price: productid ? product.price : "",
        discount: productid ? product.discount : "",
        availableQuantity: productid ? product.availableQuantity : "",
        type: productid ? product.type : "",
        brand: productid ? product.brand : "",
        specs: productid ? product.specs : [],
        createdOn: new Date().toISOString(),
      }}
      validationSchema={ProductAddEditValidation}
      onSubmit={(vals) => {
        if (!productid) {
          dispatch(saveProduct(vals));
        } else {
          dispatch(updateProduct(vals));
        }
        navigate("/manage/products");
      }}
    >
      {(formik) => (
        <React.Fragment>
          <PageHeader title={productid ? "Edit Product" : "New Product"}></PageHeader>
          <Form className="row g-3">
            <div>
              <div className="col-md-6">
                <input type="hidden" name="id" id="productid" />
                <TextField id="name" name="name" placeholder="Enter name" label="Name" showLabel={true} />
                <TextField id="brand" name="brand" placeholder="Enter brand" label="Brand" showLabel={true} />
                <SelectField
                  id="type"
                  name="type"
                  options={types}
                  showLabel={true}
                  label="Type"
                  onChange={(e, selected) => {
                    formik.setFieldValue("type", +e.target.value);
                    productTypes.productTypeList.filter((x) => +x.id === +e.target.value).map((pt) => formik.setFieldValue("specs", pt.specs));
                  }}
                />
              </div>
              <div className="col-md-6">
                <TextField id="price" name="price" placeholder="Enter price" label="Price" showLabel={true} />
                <TextField id="discount" name="discount" placeholder="Enter discount" label="Discount" showLabel={true} />
                <TextField id="availableQuantity" name="availableQuantity" placeholder="Enter available quantity" label="Available Quantity" showLabel={true} />
              </div>
              <TextAreaField id="description" name="description" placeholder="Enter description" label="Description" showLabel={true} />
              <DisplaySpecifications specs={formik.values.specs} />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary" disabled={!(formik.isValid && formik.dirty)}>
                {productid ? "Update" : "Save"}
              </button>
              <NavLink className="btn btn-link ms-1" to="/manage/products">
                Cancel
              </NavLink>
            </div>
          </Form>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default AddEditProduct;
