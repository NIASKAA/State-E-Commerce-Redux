import React from "react";
import {CategoryMenu, Cart, ProductList} from '../../Components'

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
