import React from "react";
import { useSelector } from "react-redux";
import { PageHeader, ProductCard } from "../components";

const Products = () => {
  const { products } = useSelector((state) => state);

  return (
    <React.Fragment>
      <PageHeader title="Products"></PageHeader>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {products.productList.length > 0 && (
          <React.Fragment>
            {products.productList.map((p, i) => (
              <ProductCard key={i} id={p.name + "_" + i} name={p.name + "_" + i} product={p} />
            ))}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Products;
