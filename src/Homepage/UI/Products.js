import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";
import "./Header.css";
import Slider from "react-slick"



const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts, status] = useState([]);

  const [todoPerPage, settodoPerPage] = useState(5)
  const [currentPage, setcurrentPage] = useState(1)
  const indexOfLastPage = currentPage * todoPerPage
  const indexOffirstPage = indexOfLastPage - todoPerPage

  const visibleTodos = products.slice(indexOffirstPage, indexOfLastPage)

  const numbOfTotalPage = Math.ceil(products.length / todoPerPage)
  const pages = [...Array(numbOfTotalPage + 1).keys()].slice(1)

  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  // const { data: products,  } = useSelector((state) => state.product);

  const url = "https://dummyjson.com/products"

  const fetchProduct = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const product = await res.json();
    console.log(product.products.images);
    setProducts(product.products);
  };


  useEffect(() => {
    // dispatch(fetchProducts());
    
    fetchProduct()
  }, []);


  const handlePrevbtn = () => {
    if (currentPage !== 1) {
      setcurrentPage(currentPage - 1)

    }
  }

  const handleNextbtn = () => {
    if (currentPage !== numbOfTotalPage) {
      setcurrentPage(currentPage + 1)

    }
  }

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <div className="">
      <div className="row product_wrap">

        {visibleTodos.map((product) => (
          <div className="col-lg-4 my-3 p-1 " key={product.id}>
            <div className="shadow p-3 mb-5 bg-white rounded Item_height">
              <div className="d-flex justify-content-center p-3">
              
                <img src={product.images[0]} alt={product.title} />
                  
                  

                 
              </div>
              <h5 className="py-2 pr-4">{product.title}</h5>
              <h6>{product.price} $</h6>

              <p className="d-flex">
                <span>
                  {product.rating}
                </span>
                <span className="d-flex">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z" fill="rgba(50,152,219,1)" /></svg>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z" fill="rgba(50,152,219,1)" /></svg>
                </span>


              </p>

              <button onClick={() => handleAdd(product)} className="btn btn-primary">
                Add to Favourite
              </button>
            </div>
          </div>

        ))}
      </div>



      <div className="row">

        <div className="col d-flex justify-content-center ">
          <p className="page_numbers">
            <span className="btn btn-danger" onClick={handlePrevbtn}>
              Prev
            </span>
            {
              pages.map((page, index) => {
                return (
                  <span key={page} onClick={() => setcurrentPage(page)}
                    className={`${currentPage === page ? "active" : ""}`}
                  >
                    {page}
                  </span>
                )
              })
            }

            <span className="btn btn-danger" onClick={handleNextbtn}>
              Next
            </span>
          </p>

        </div>
      </div>
    </div >

  );
};

export default Products;
