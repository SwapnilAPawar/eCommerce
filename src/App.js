import React from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Container } from "react-bootstrap";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { useState, useMemo } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);
  return (
    <UserProvider value={value}>
      <BrowserRouter>
        <div className="d-flex flex-column sticky-footer-wrapper min-vh-100">
          <Header></Header>
          <main className="flex-fill pt-5">
            <Container className="pt-5">
              <AppRoutes />
            </Container>
          </main>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
