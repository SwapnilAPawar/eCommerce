import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { ProductAddCartValidation } from "../validations/ProductAddCartValidation";
import { TextField } from "../components";
import { addToCart } from "../reducers/CartReducer";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);
  const product = products?.productList?.find((product) => +product.id === +id) || {};
  const handleThumbnailClick = (e, id) => {
    console.log(`thumbnail ${id} click.`);
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={{ ...product, quantity: 1 }}
        validationSchema={ProductAddCartValidation}
        onSubmit={(vals) => {
          console.log(vals);
          dispatch(addToCart(vals));
        }}
      >
        {(formik) => (
          <Form>
            <div className="container mt-5 mb-5">
              <div className="row">
                <div className="card">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="images p-3">
                        <div className="text-center">
                          <img alt="main-img" id="main-image" className="img-fluid" src="https://placehold.jp/300x300.png" />
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                          <img alt="main-img1" onClick={(e) => handleThumbnailClick(e, 1)} src="https://placehold.jp/90x90.png" />
                          <img alt="main-img2" className="ms-2" onClick={(e) => handleThumbnailClick(e, 2)} src="https://placehold.jp/90x90.png" />
                          <img alt="main-img3" className="ms-2" onClick={(e) => handleThumbnailClick(e, 2)} src="https://placehold.jp/90x90.png" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="product p-4">
                        <div className="mt-4 mb-3">
                          <span className="text-uppercase text-muted brand">{formik.values.brand}</span>
                          <h5 className="text-uppercase">Men's slim fit t-shirt</h5>
                          <div className="price d-flex flex-row align-items-center">
                            <div className="ml-2">
                              <div>
                                <h3 className="card-text d-inline">${formik.values.price - (formik.values.price * formik.values.discount) / 100}</h3>
                                {formik.values.discount > 0 && (
                                  <React.Fragment>
                                    <span className="text-decoration-line-through ms-2">${formik.values.price}</span>
                                    <span className="ms-2">{`${formik.values.discount}% OFF`} </span>
                                  </React.Fragment>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="about">{formik.values.description}</p>
                        {formik.values.specs &&
                          formik.values.specs.length > 0 &&
                          formik.values.specs
                            .slice()
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((spec, idx) => {
                              return (
                                <React.Fragment key={`rf${spec.name}_${idx}`}>
                                  {spec.type === "dropdown" && (
                                    <div className="sizes mb-5">
                                      <h6 className="text-uppercase">{spec.name}</h6>
                                      {spec.value.split(",").map((val, spec_idx) => (
                                        <label key={`lbl${spec.name}_${spec_idx}`} className="radio mx-1">
                                          <input
                                            key={`${spec.name}_${spec_idx}_${idx}`}
                                            id={`${spec.name}_${spec_idx}_${idx}`}
                                            type="radio"
                                            name={spec.name}
                                            value={val}
                                            checked={spec.selectedValue === val}
                                            onChange={(e) => {
                                              const { value } = e.target;
                                              const idx = e.target.id.split("_")[2];
                                              formik.setFieldValue(`specs[${idx}].selectedValue`, value);
                                            }}
                                          />
                                          <span>{val}</span>
                                        </label>
                                      ))}
                                    </div>
                                  )}{" "}
                                  {spec.type !== "dropdown" && (
                                    <div className="row">
                                      <div className="col-md-4 border border-secondary bg-light text-dark">
                                        <h6 className="text-uppercase flex-grow-1 my-2">{spec.name}</h6>
                                      </div>
                                      <div className="col-md-8 border border-secondary">
                                        <p className="text-uppercase flex-grow-1 my-2">{spec.value && spec.value.length > 0 ? spec.value : "--"}</p>
                                      </div>
                                    </div>
                                  )}
                                </React.Fragment>
                              );
                            })}
                        <div className="row">
                          <div className="col-lg-4 p-0 mt-4">
                            <div className="input-group">
                              <button
                                className="btn btn-primary"
                                type="button"
                                id="subtractQuantity"
                                name="subtractQuantity"
                                onClick={() => {
                                  if (parseInt(formik.values.quantity) > 1) {
                                    formik.setFieldValue("quantity", parseInt(formik.values.quantity) - 1);
                                  }
                                }}
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                              <input
                                className="form-control text-end"
                                id="quantity"
                                name="quantity"
                                value={formik.values.quantity}
                                onChange={(e) => {
                                  const { value } = e.target;
                                  const regex = /^[0-9\b]+$/;
                                  if (value === "" || parseInt(value) === 0) {
                                    formik.setFieldValue("quantity", 1);
                                  } else if (regex.test(value.toString())) {
                                    formik.setFieldValue("quantity", parseInt(value));
                                  }
                                }}
                                style={{ width: "10px" }}
                              />
                              <button
                                className="btn btn-primary"
                                type="button"
                                id="addQuantity"
                                name="addQuantity"
                                onClick={() => {
                                  formik.setFieldValue("quantity", parseInt(formik.values.quantity) + 1);
                                }}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mt-4 p-0 mt-4">
                            <button className="btn btn-primary text-uppercase mr-2 px-4">Add to cart</button>
                            <NavLink className="btn btn-link ms-1" to="/products">
                              Back
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default Product;
