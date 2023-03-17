import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";


const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const { setCurrentUser } = useCurrentUser();
  const { cart } = useSelector((state) => state);
  let { pathname } = useLocation();
  console.log(cart);

  const handleSignout = () => {
    dispatch({ type: "SIGNOUT_REQUEST" });
    setCurrentUser({
      isAuthenticated: false,
      username: null,
      features: [],
    });
    window.localStorage.clear();
    window.sessionStorage.clear();
    deleteAllCookies();

    navigate("/home");
  };

  const deleteAllCookies = () => {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  return (
    <>
      <Navbar collapseOnSelect key="lg" bg="primary" expand="lg" fixed="top" className="mb-3 pb-3">
        <Container fluid>
          <Navbar.Brand href="#">eCommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-lg`} aria-labelledby={`offcanvasNavbarLabel-expand-lg`} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>&nbsp;</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav activeKey={pathname} className="flex-grow-1 pe-3">
                <Nav.Link eventKey="home" as={NavLink} className={`nav-link ({ isActive }) => (isActive ? "active" : "")`} to="/home">
                  Home
                </Nav.Link>
                <Nav.Link eventKey="products" as={NavLink} className={`nav-link ({ isActive }) => (isActive ? "active" : "")`} to="/products">
                  Products
                </Nav.Link>
                {currentUser?.isAuthenticated && (
                  <React.Fragment>
                    <Nav.Link eventKey="manageusers" as={NavLink} className={`nav-link ({ isActive }) => (isActive ? "active" : "")`} to="/manage/users">
                      Users
                    </Nav.Link>
                    <Nav.Link eventKey="manageproducts" as={NavLink} className={`nav-link ({ isActive }) => (isActive ? "active" : "")`} to="/manage/products">
                      Products
                    </Nav.Link>
                    <Nav.Link eventKey="manageproducttypes" as={NavLink} className={`nav-link ({ isActive }) => (isActive ? "active" : "")`} to="/manage/producttypes">
                      Product Types
                    </Nav.Link>
                  </React.Fragment>
                )}
              </Nav>
              <Nav activeKey={pathname} className="justify-content-end">
                {!currentUser?.isAuthenticated && (
                  <React.Fragment>
                    <Nav.Link eventKey="login" as={NavLink} className={`nav-link ({ isActive }) => (isActive ? "active" : "")`} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link eventKey="register" as={NavLink} className={`nav-link ({ isActive }) => (isActive ? "active" : "")`} to="/register">
                      Sign Up
                    </Nav.Link>
                  </React.Fragment>
                )}
                {currentUser?.isAuthenticated && (
                  <React.Fragment>
                    <Nav.Link eventKey="cart" as={NavLink} className="btn btn-light position-relative" to="/cart">
                      <i className="fa fa-shopping-cart fs-5"></i>&nbsp;My Cart
                      <span className="mybadge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-1">
                        {cart.cartItems.length < 99 ? cart.cartItems.length : "99+"}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </Nav.Link>
                    <NavDropdown title={currentUser.userName} align="end" id={`offcanvasNavbarDropdown-expand-lg`}>
                      <NavDropdown.Item eventKey="myaccount" as={NavLink} className={`nav-link ({ isActive }) => (isActive ? "active" : "")`} to="/myaccount">
                        My Account
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="changepassword" as={NavLink} className={`nav-link ({ isActive }) => (isActive ? "active" : "")`} to="/changepassword">
                        Change Password
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item eventKey="signout" type="button" onClick={handleSignout}>
                        Sign Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </React.Fragment>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
