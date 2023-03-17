import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { PageHeader } from "../components";
import Permissions from "../enums/Permissions";
import { removeProduct } from "../reducers/ProductReducer";
import useHasPermission from "../hooks/useHasPermissions";
const ManageProducts = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const hasAddProductAccess = useHasPermission(Permissions.ADD_PRODUCT);
  const hasEditProductAccess = useHasPermission(Permissions.EDIT_PRODUCT);
  const hasDeleteProductAccess = useHasPermission(Permissions.DELETE_PRODUCT);

  const handleDelete = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <React.Fragment>
      <PageHeader title="Manage Products"></PageHeader>
      <table className="table table-hover">
        <thead>
          <tr className="table-primary">
            <th className="col-3 align-middle">Name</th>
            <th className="col-5 align-middle">Details</th>
            <th className="col-4 align-middle text-end">
              {hasAddProductAccess && (
                <NavLink className="btn btn-primary" to="/manage/products/new/product">
                  <i className="fa fa-plus"></i>
                  <span className="d-none d-sm-inline">&nbsp;Add New</span>
                </NavLink>
              )}
            </th>
          </tr>
        </thead>
        {products.productList.length > 0 && (
          <tbody>
            {products.productList.map((u, i) => (
              <tr key={i}>
                <td className="col-3 align-middle text-truncate" valign="middle">
                  {u.name}
                </td>
                <td className="col-5 align-middle text-truncate" valign="middle">
                  {u.description.length > 50 ? `${u.description.substring(0, 50)}...` : u.description}
                </td>
                <td className="col-4 align-middle text-end">
                  {hasEditProductAccess && (
                    <NavLink className="btn btn-primary" to={"/manage/products/" + u.id + "/product"}>
                      <i className="fa fa-pencil"></i>
                      <span className="d-none d-lg-inline">&nbsp;Edit</span>
                    </NavLink>
                  )}
                  {hasDeleteProductAccess && (
                    <a className="btn btn-danger ms-1" type="button" onClick={() => handleDelete(u.id)}>
                      <i className="fa fa-trash"></i>
                      <span className="d-none d-lg-inline">&nbsp;Delete</span>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {products.productList.length === 0 && (
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

export default ManageProducts;
