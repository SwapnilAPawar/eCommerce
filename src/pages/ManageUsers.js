import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { PageHeader } from "../components";
import Permissions from "../enums/Permissions";
import { removeUser } from "../reducers/UserReducer";
import useHasPermission from "../hooks/useHasPermissions";
const ManageUsers = () => {
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();
  const hasAddUserAccess = useHasPermission(Permissions.ADD_USER);
  const hasEditUserAccess = useHasPermission(Permissions.EDIT_USER);
  const hasDeleteUserAccess = useHasPermission(Permissions.DELETE_USER);

  const handleDelete = (id) => {
    dispatch(removeUser(id));
  };

  return (
    <React.Fragment>
      <PageHeader title="Users"></PageHeader>
      <table className="table table-hover">
        <thead>
          <tr className="table-primary">
            <th className="col-3 align-middle">Name</th>
            <th className="col-3 align-middle">Email</th>
            <th className="col-2 align-middle text-center">Locked</th>
            <th className="col-4 align-middle text-end">
              {hasAddUserAccess && (
                <NavLink className="btn btn-primary" to="/manage/users/new/user">
                  <i className="fa fa-plus"></i>
                  <span className="d-none d-sm-inline">&nbsp;Add New</span>
                </NavLink>
              )}
            </th>
          </tr>
        </thead>
        {users.userList.length > 0 && (
          <tbody>
            {users.userList.map((u, i) => (
              <tr key={i}>
                <td className="col-3 align-middle text-truncate" valign="middle">
                  {u.firstName} {u.lastName}
                </td>
                <td className="col-3 align-middle text-truncate" valign="middle">
                  {u.email}
                </td>
                <td className="col-2 align-middle text-center" valign="middle">
                  {u.locked && <i className="fa fa-lock"></i>}
                  {!u.locked && <i className="fa fa-unlock"></i>}
                </td>
                <td className="col-4 align-middle text-end">
                  {hasEditUserAccess && (
                    <NavLink className="btn btn-primary" to={"/manage/users/" + u.id + "/user"}>
                      <i className="fa fa-pencil"></i>
                      <span className="d-none d-sm-inline">&nbsp;Edit</span>
                    </NavLink>
                  )}
                  {hasDeleteUserAccess && (
                    <a className="btn btn-danger ms-1" type="button" onClick={() => handleDelete(u.id)}>
                      <i className="fa fa-trash"></i>
                      <span className="d-none d-sm-inline">&nbsp;Delete</span>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {users.userList.length === 0 && (
          <tbody>
            <tr>
              <td colSpan="4" className="align-middle text-truncate border-0">
                No records found.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </React.Fragment>
  );
};

export default ManageUsers;
