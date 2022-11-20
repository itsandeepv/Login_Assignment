// import { getNodeText } from '@testing-library/react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../store/cartSlice';
import "../UI/Header.css"
const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart);
    const handleRemove = (productId) => {
        dispatch(remove(productId));
    };

    return (
        <div className='container'>
            <div className='row mt-2 text-center'>
                <h3>Your Favourites </h3>
                {products.map((product) => (
                    <div className="col-lg-12">
                        <div key={product.id} className="cartCard shadow p-3 mb-5 bg-white rounded">
                            <div className="d-flex justify-content-center p-3">
                                <img src={product.images[1]} alt="productImage" />
                            </div>
                            <h5 className='py-3'>{product.title}</h5>
                            <h5>{product.price} $</h5>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleRemove(product.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Cart;
