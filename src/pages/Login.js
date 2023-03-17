import { Formik, Form } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageHeader, TextField } from "../components";
import { signIn } from "../reducers/LoginReducer";
import { LoginSchema } from "../validations/LoginValidations";
import useCurrentUser from "../hooks/useCurrentUser";
import Permissions from "../enums/Permissions";
import { Alert } from "react-bootstrap";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUser();
  const [hasLoginFailed, setHasLoginFailed] = useState(false);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(vals) => {
        // var date = new Date();
        if (vals.email === "test@test.com" && vals.password === "Test@12345") {
          const payload = {
            isAuthenticated: true,
            token: "Test123",
            expires: new Date(Date.now() + 3600 * 1000 * 24), //24 hours
            userName: vals.email,
            features: [Permissions.MANAGE_USERS, Permissions.ADD_USER, Permissions.EDIT_USER, , Permissions.DELETE_USER, Permissions.MANAGE_PRODUCTS, Permissions.ADD_PRODUCT, Permissions.EDIT_PRODUCT, Permissions.DELETE_PRODUCT, Permissions.APPROVE_PRODUCT, Permissions.MANAGE_PRODUCT_TYPES, Permissions.ADD_PRODUCT_TYPE, Permissions.EDIT_PRODUCT_TYPE, Permissions.DELETE_PRODUCT_TYPE, Permissions.APPROVE_PRODUCT_TYPE, Permissions.CART],
          };
          dispatch(signIn(payload));
          setCurrentUser(payload);
          navigate("/home");
          setHasLoginFailed(false);
        } else {
          dispatch({ type: "SIGNOUT_REQUEST" });
          setCurrentUser({
            isAuthenticated: false,
            token: null,
            expires: null,
            username: null,
            features: [],
          });
          setHasLoginFailed(true);
        }
      }}
    >
      {(formik) => (
        <div className="row">
          <div className="position-absolute top-50 start-50 translate-middle col-xs-12 col-md-6">
            <PageHeader title="Sign In"></PageHeader>
            <Form className="row g-3">
              <TextField type="email" placeholder="Enter Email" id="email" name="email" label="Email" showLabel={true} />
              <TextField type="password" placeholder="Enter Password" id="password" name="password" label="Password" showLabel={true} />
              <div className="col-12">
                <button className="btn btn-primary" type="submit" disabled={!(formik.isValid && formik.dirty)}>
                  Submit
                </button>
                <NavLink className="btn btn-link ms-1" to="/forgotpassword">
                  Forgot Password
                </NavLink>
              </div>
              <div className={`col-12 ${hasLoginFailed ? "" : "d-none"}`}>
                <Alert key="danger" variant="danger">
                  Incorrect UserName or Password.
                </Alert>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
