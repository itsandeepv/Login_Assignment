import React from "react";
import "./Home.css"
import Navbar from "../Homepage/UI/Navbar"

import Products from "../Homepage/UI/Products"

function Home() {
  return <div>
    <div className="container">
      <Navbar />

      <section>
        <h3>Products</h3>
        <Products />
      </section>

    </div>



  </div>;
}

export default Home;
