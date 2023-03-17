import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { saveUser } from "../reducers/UserReducer";
import { RegisterSchema } from "../validations/RegisterValidations";
import { PageHeader, TextField } from "../components";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(vals) => {
        vals.locked = true;
        dispatch(saveUser(vals));
        navigate("/login");
      }}
    >
      {(formik) => (
        <div>
          <PageHeader title="Sign Up"></PageHeader>
          <Form className="row g-3 col-md-6">
            <TextField id="firstName" name="firstName" placeholder="First Name" label="First Name" showLabel={true} />
            <TextField id="lastName" name="lastName" placeholder="Last Name" label="Last Name" showLabel={true} />
            <TextField id="email" name="email" placeholder="Email" label="Email" showLabel={true} />
            <TextField id="password" name="password" placeholder="Password" label="Password" showLabel={true} />
            <TextField id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" label="Confirm Password" showLabel={true} />
            <div className="col-12">
              <button id="register" name="register" type="submit" className="btn btn-primary" disabled={!(formik.isValid && formik.dirty)}>
                Sign Up
              </button>
              <NavLink id="cancel" name="cancel" className="btn btn-link ms-1" to="/">
                Cancel
              </NavLink>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Register;
