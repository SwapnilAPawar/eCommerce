import React from "react";
import { PageHeader } from "../components";
import { useSelector, useDispatch } from "react-redux";
import Permissions from "../enums/Permissions";
import useHasPermissions from "../hooks/useHasPermissions";
import { NavLink } from "react-router-dom";
import { removeProductType } from "../reducers/ProductTypeReducer";

const ManageProductTypes = () => {
  const dispatch = useDispatch();
  const { productTypes } = useSelector((state) => state);
  const hasAddProductTypeAccess = useHasPermissions(Permissions.ADD_PRODUCT_TYPE);
  const hasEditProductTypeAccess = useHasPermissions(Permissions.EDIT_PRODUCT_TYPE);
  const hasDeleteProductTypeAccess = useHasPermissions(Permissions.DELETE_PRODUCT_TYPE);

  const handleDelete = (id) => {
    dispatch(removeProductType(id));
  };

  return (
    <React.Fragment>
      <PageHeader title="Product Types"></PageHeader>
      <table className="table table-hover">
        <thead>
          <tr className="table-primary">
            <th className="col-8 align-middle">Name</th>
            <th className="col-4 align-middle text-end">
              {hasAddProductTypeAccess && (
                <NavLink className="btn btn-primary" to="/manage/producttypes/new/producttype">
                  <i className="fa fa-plus"></i>
                  <span className="d-none d-sm-inline">&nbsp;Add New</span>
                </NavLink>
              )}
            </th>
          </tr>
        </thead>
        {productTypes.productTypeList.length > 0 && (
          <tbody>
            {productTypes.productTypeList.map((pt, i) => (
              <tr key={i}>
                <td className="col-8 align-middle text-truncate">{pt.name}</td>
                <td className="col-4 align-middle text-end">
                  {hasEditProductTypeAccess && (
                    <NavLink className="btn btn-primary" to={"/manage/producttypes/" + pt.id + "/producttype"}>
                      <i className="fa fa-pencil"></i>
                      <span className="d-none d-sm-inline">&nbsp;Edit</span>
                    </NavLink>
                  )}
                  {hasDeleteProductTypeAccess && (
                    <a className="btn btn-danger ms-1" type="button" onClick={() => handleDelete(pt.id)}>
                      <i className="fa fa-trash"></i>
                      <span className="d-none d-sm-inline">&nbsp;Delete</span>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {productTypes.productTypeList.length <= 0 && (
          <tbody>
            <tr>
              <td colSpan="3" className="align-middle text-truncate border-0">
                No records found.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </React.Fragment>
  );
};
export default ManageProductTypes;
