import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Header.css"
const Navbar = () => {
    const items = useSelector((state) => state.cart);
    return (
        <div
            className='header_style row my-2'
        >

            <div className='col-lg-6 my-1 header_item'>
                <span >
                    <h4>

                        Add Your Fevrate Product
                    </h4>
                </span>

            </div>

            <div className='col-lg-6 my-1 header_item2'>

                <NavLink className="btn btn-secondary" to="/cart">
                    Show Favourite
                </NavLink>
                <span className="cartCount">Total items: {items.length}</span>
            </div>
        </div>
    );
};

export default Navbar;
