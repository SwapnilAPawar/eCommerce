import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PageLoader, PrivateRoute } from "./components";
import Permissions from "./enums/Permissions";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ManageUsers = lazy(() => import("./pages/ManageUsers"));
const AddEditUser = lazy(() => import("./pages/AddEditUser"));
const AccessDenied = lazy(() => import("./pages/AccessDenied"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const ManageProducts = lazy(() => import("./pages/ManageProducts"));
const AddEditProduct = lazy(() => import("./pages/AddEditProduct"));
const ManageProductTypes = lazy(() => import("./pages/ManageProductTypes"));
const Products = lazy(() => import("./pages/Products"));
const Product = lazy(() => import("./pages/Product"));
const AddEditProductType = lazy(() => import("./pages/AddEditProductType"));
const Cart = lazy(() => import("./pages/Cart"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader></PageLoader>}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/myaccount" element={<MyAccount />} />
        <Route exact path="/changepassword" element={<ChangePassword />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:id/product" element={<Product />} />
        <Route exact path="/manage/users" element={<PrivateRoute feature={Permissions.MANAGE_USERS} />}>
          <Route path="/manage/users" element={<ManageUsers />} />
        </Route>
        <Route exact path="/manage/users/new/user" element={<PrivateRoute feature={Permissions.ADD_USER} />}>
          <Route path="/manage/users/new/user" element={<AddEditUser />} />
        </Route>
        <Route exact path="/manage/users/:id/user" element={<PrivateRoute feature={Permissions.EDIT_USER} />}>
          <Route path="/manage/users/:id/user" element={<AddEditUser />} />
        </Route>
        <Route exact path="/manage/products" element={<PrivateRoute feature={Permissions.MANAGE_PRODUCTS} />}>
          <Route path="/manage/products" element={<ManageProducts />} />
        </Route>
        <Route exact path="/manage/products/new/product" element={<PrivateRoute feature={Permissions.ADD_PRODUCT} />}>
          <Route path="/manage/products/new/product" element={<AddEditProduct />} />
        </Route>
        <Route exact path="/manage/products/:productid/product" element={<PrivateRoute feature={Permissions.EDIT_PRODUCT} />}>
          <Route path="/manage/products/:productid/product" element={<AddEditProduct />} />
        </Route>
        <Route exact path="/manage/producttypes" element={<PrivateRoute feature={Permissions.MANAGE_PRODUCT_TYPES} />}>
          <Route path="/manage/producttypes" element={<ManageProductTypes />} />
        </Route>
        <Route exact path="/manage/producttypes/new/producttype" element={<PrivateRoute feature={Permissions.ADD_PRODUCT_TYPE} />}>
          <Route path="/manage/producttypes/new/producttype" element={<AddEditProductType />} />
        </Route>
        <Route exact path="/manage/producttypes/:producttypeid/producttype" element={<PrivateRoute feature={Permissions.EDIT_PRODUCT_TYPE} />}>
          <Route path="/manage/producttypes/:producttypeid/producttype" element={<AddEditProductType />} />
        </Route>
        <Route exact path="/cart" element={<PrivateRoute feature={Permissions.CART} />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/accessdenied" element={<AccessDenied />} />
        {/* * path always last entry */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};
export default AppRoutes;
