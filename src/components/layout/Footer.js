const Footer = () => {
  return (
    <nav className="navbar sticky-bottom navbar-light bg-light border-top mt-5" >
      <div className="container-fluid">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 col-12">
          <div className="col-md-4 d-flex align-items-center">
            <span className="text-muted">© {new Date().getFullYear()} Company, Inc</span>
          </div>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-muted" href="#twitter">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="#linkedin">
                <i className="fa fa-linkedin"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="#facebook">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </nav>
  );
};

export default Footer;
