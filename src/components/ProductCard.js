import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = (props) => {
  const { product } = props;

  return (
    <div className="col">
      <div className="overlay overlay-secondary">
        <div className="card h-100">
          <NavLink role="button" to={`/products/${product.id}/product`}>
            <img src="https://placehold.jp/150x150.png" className="card-img-top" alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title text-start">{product.availableQuantity <= 0 ? <span className="badge bg-dark">OUT OF STOCK</span> : product.discount > 0 ? <span className="badge bg-danger">SALE 10% OFF</span> : Math.floor(Math.abs(new Date() - new Date(product.createdOn)) / (1000 * 60 * 60 * 24)) <= 15 ? <span className="badge bg-success">NEW</span> : ""}</h5>
            </div>
          </NavLink>
          <div className="card-body">
            <h5 className="card-title">
              <NavLink role="button" to={`/products/${product.id}/product`}>
                {product.name}
              </NavLink>
            </h5>
            <p className="card-text text-truncate">{product.description}</p>
            <div>
              <h3 className="card-text d-inline">${product.price - (product.price * product.discount) / 100}</h3>
              {product.discount > 0 && (
                <React.Fragment>
                  <span className="text-decoration-line-through ms-2">${product.price}</span>
                  <span className="ms-2">{`${product.discount}% OFF`} </span>
                </React.Fragment>
              )}
            </div>
          </div>
          {/* <div className="card-footer">
            <div className="d-flex bd-highlight">
              <div className="flex-grow-1 bd-highlight">
                <div className="input-group">
                  <button className="btn btn-primary" type="button" id="button-addon1">
                    <i className="fa fa-minus"></i>
                  </button>
                  <input type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                  <button className="btn btn-primary" type="button" id="button-addon1">
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="col-6 bd-highlight text-end">
                <button className="btn btn-primary" type="button">
                  Add To Cart
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
