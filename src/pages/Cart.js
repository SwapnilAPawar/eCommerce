import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { PageHeader, TextAreaField, TextField } from "../components";

const Cart = () => {
  const { cart } = useSelector((state) => state);

  const changeQuantity = (id) => {
    console.log("changeQuantity");
  };

  return (
    <Formik initialValues={{ cart }} onSubmit={() => {}}>
      {(formik) => (
        <React.Fragment>
          <PageHeader title="Cart"></PageHeader>
          <Form>
            <section className="h-100 gradient-custom">
              <div>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-8">
                    <div className="card mb-4">
                      <div className="card-header py-3">
                        <h5 className="mb-0">
                          Cart - {cart.cartItems.length} item
                          {cart.cartItems.length > 1 ? "s" : ""}
                        </h5>
                      </div>
                      <div className="card-body">
                        {cart.cartItems.map((ci, i) => (
                          <div key={`div_${ci.id}`}>
                            <div className="row">
                              <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                {/* Image */}
                                <NavLink
                                  key={ci.id}
                                  role="button"
                                  to={`/products/${ci.name}/product`}
                                >
                                  <div
                                    className="bg-image hover-overlay hover-zoom ripple rounded"
                                    data-mdb-ripple-color="light"
                                  >
                                    <img
                                      src="https://placehold.jp/70x70.png"
                                      className="w-100"
                                      alt={ci.name}
                                    />
                                    {/* <a href="#!">
                                      <div
                                        className="mask"
                                        style={{
                                          backgroundColor:
                                            "rgba(251, 251, 251, 0.2)",
                                        }}
                                      ></div>
                                    </a> */}
                                  </div>
                                </NavLink>
                                {/* Image */}
                              </div>

                              <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                {/* Data */}
                                <p>
                                  <NavLink
                                    key={ci.id}
                                    role="button"
                                    to={`/products/${ci.name}/product`}
                                  >
                                    <strong>{ci.name}</strong>
                                  </NavLink>
                                </p>
                                <p>{ci.description}</p>
                                <p>
                                  Unit Price:
                                  <strong>{` $${
                                    ci.price - (ci.price * ci.discount) / 100
                                  } `}</strong>
                                  {ci.discount > 0 && (
                                    <React.Fragment>
                                      <small className="text-decoration-line-through">
                                        ${ci.price}
                                      </small>
                                      <small className="ms-2">
                                        {`${ci.discount}% OFF`}
                                      </small>
                                    </React.Fragment>
                                  )}
                                </p>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm me-1 mb-2"
                                  data-mdb-toggle="tooltip"
                                  title="Remove item"
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm mb-2"
                                  data-mdb-toggle="tooltip"
                                  title="Move to the wish list"
                                >
                                  <i className="fa fa-heart"></i>
                                </button>
                                {/* Data */}
                              </div>

                              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                {/* Quantity */}
                                <div
                                  className="d-flex mb-4"
                                  style={{ maxWidth: "300px" }}
                                >
                                  <button
                                    className="btn btn-primary px-3 me-2"
                                    //onClick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                  >
                                    <i className="fa fa-minus"></i>
                                  </button>

                                  <div className="form-outline">
                                    <input
                                      id={`qty_${ci.id}`}
                                      min="0"
                                      name="quantity"
                                      type="number"
                                      className="form-control"
                                      value={ci.quantity}
                                      onChange={() => changeQuantity()}
                                    />
                                  </div>

                                  <button
                                    className="btn btn-primary px-3 ms-2"
                                    //onClick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                  >
                                    <i className="fa fa-plus"></i>
                                  </button>
                                </div>
                                {/* Quantity */}

                                {/* Price */}
                                <p className="text-start text-md-center">
                                  <strong>{`$${
                                    (ci.price -
                                      (ci.price * ci.discount) / 100) *
                                    ci.quantity
                                  }`}</strong>
                                </p>
                                {/* Price */}
                              </div>
                            </div>
                            {cart.cartItems.length - 1 > i && (
                              <hr className="my-4" key={`hr_${i}`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card mb-4">
                      <div className="card-header py-3">
                        <h5 className="mb-0">Summary</h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Products
                            <span>{`$${cart.cartItems.reduce(
                              (total, item) =>
                                total +
                                (item.price -
                                  (item.price * item.discount) / 100) *
                                  item.quantity,
                              0
                            )}`}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                            Shipping
                            <span>0</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                            <div>
                              <strong>Total amount</strong>
                              <strong>
                                <p className="mb-0">(including VAT)</p>
                              </strong>
                            </div>
                            <span>
                              <strong>
                                {`$${cart.cartItems.reduce(
                                  (total, item) =>
                                    total +
                                    (item.price -
                                      (item.price * item.discount) / 100) *
                                      item.quantity,
                                  0
                                )}`}
                              </strong>
                            </span>
                          </li>
                        </ul>

                        <button
                          type="button"
                          className="btn btn-primary btn-lg btn-block"
                        >
                          Go to checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Form>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default Cart;
