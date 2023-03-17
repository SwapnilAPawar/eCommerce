import React from "react";
import { Formik, Form } from "formik";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { UserAddEditSchema } from "../validations/UserAddEditValidation";
import { useSelector, useDispatch } from "react-redux";
import { saveUser, updateUser } from "../reducers/UserReducer";
import { PageHeader, TextField, CheckboxField } from "../components";

const AddEditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const navigate = useNavigate();

  const user = users?.userList?.find((user) => user.id === +id) || {};

  return (
    <Formik
      initialValues={{
        id: !id ? 0 : id,
        firstName: !id ? "" : user.firstName,
        lastName: !id ? "" : user.lastName,
        email: !id ? "" : user.email,
        password: !id ? "" : user.password,
        locked: !id ? false : user.locked,
        createdOn: new Date().toISOString(),
      }}
      validationSchema={UserAddEditSchema}
      onSubmit={(vals) => {
        if (!id) {
          dispatch(saveUser(vals));
        } else {
          dispatch(updateUser(vals));
        }
        navigate("/manage/users");
      }}
    >
      {(formik) => (
        <div>
          <PageHeader title={!id ? "New User" : "Edit"}></PageHeader>
          <Form className="row g-3 col-md-6">
            <input type="hidden" className="form-control" id="id" name="id" />
            <TextField type="text" id="firstName" name="firstName" placeholder="First Name" label="First Name" showLabel={true} />
            <TextField type="text" id="lastName" name="lastName" placeholder="Last Name" label="Last Name" showLabel={true} />
            <TextField type="text" id="email" name="email" placeholder="Email" label="Email Id" showLabel={true} />
            <TextField type="password" id="password" name="password" placeholder="Password" label="Password" showLabel={true} />
            <CheckboxField id="locked" name="locked" label="Locked"></CheckboxField>
            <div className="col-12">
              <button type="submit" className="btn btn-primary" disabled={!(formik.isValid && formik.dirty)}>
                {!id ? "Save" : "Update"}
              </button>
              <NavLink className="btn btn-link ms-1" to="/manage/users">
                Cancel
              </NavLink>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default AddEditUser;
