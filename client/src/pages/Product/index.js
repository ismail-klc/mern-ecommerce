import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addTocart } from '../../actions/cart.actions'
import { ToastContainer, toast } from 'react-toastify';

function Product(props) {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const handleAddToCart = () => {

        if (cart.cartItems.some(a => a.product === props.id)) {
            toast.error(`This product is already in your cart`, {
                position: "bottom-right",
            });
        } 
        else {
            dispatch(addTocart(props.id))
            toast.success(`${props.name} added to cart`, {
                position: "bottom-right",
            });
        }
    }

    return (

        <div className="col-sm-3">
            <div className="product-image-wrapper">
                <div className="single-products">
                    <div className="productinfo text-center">
                        <img
                            height={250}
                            src={`http://localhost:3000/public/${props.image}`} alt="" />
                        <h2>${props.price}</h2>
                        <p>{props.name}</p>
                        <a onClick={handleAddToCart} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                    <div className="product-overlay">
                        <div className="overlay-content">
                            <h2>${props.price}</h2>
                            <p>{props.name}</p>
                            <a onClick={handleAddToCart} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                        </div>
                    </div>
                </div>
                <div className="choose">
                    <ul className="nav nav-pills nav-justified">
                        <li><Link to={`/product/${props.slug}`}><i className="fa fa-plus-square"></i>Go to Detail</Link></li>
                        <li><a href="#"><i className="fa fa-plus-square"></i>Add to compare</a></li>
                    </ul>
                </div>
            </div>
            <ToastContainer autoClose={3000} />
        </div>
    )
}

export default Product
