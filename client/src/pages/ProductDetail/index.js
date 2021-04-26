import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../Product'

function ProductDetail() {
    const { slug } = useParams()
    const [showedProduct, setShowedProduct] = useState()
    const product = useSelector(state => state.product)

    useEffect(() => {
        setShowedProduct(product.products.find(a => a.slug === slug))
    }, [product, showedProduct])



    if (showedProduct) {
        return (
            <Layout>
                <section>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 padding-right">
                                <div class="product-details">
                                    <div class="col-sm-5">
                                        <div class="view-product">
                                            <img src={`http://localhost:3000/public/${showedProduct.productPictures[0].img}`} alt="" />
                                            <h3>ZOOM</h3>
                                        </div>
                                        <div id="similar-product" class="carousel slide" data-ride="carousel">

                                            <div class="carousel-inner">
                                                <div class="item active">
                                                    <a href=""><img src="/images/product-details/similar1.jpg" alt="" /></a>
                                                    <a href=""><img src="/images/product-details/similar2.jpg" alt="" /></a>
                                                    <a href=""><img src="/images/product-details/similar3.jpg" alt="" /></a>
                                                </div>
                                                <div class="item">
                                                    <a href=""><img src="/images/product-details/similar1.jpg" alt="" /></a>
                                                    <a href=""><img src="/images/product-details/similar2.jpg" alt="" /></a>
                                                    <a href=""><img src="/images/product-details/similar3.jpg" alt="" /></a>
                                                </div>
                                                <div class="item">
                                                    <a href=""><img src="/images/product-details/similar1.jpg" alt="" /></a>
                                                    <a href=""><img src="/images/product-details/similar2.jpg" alt="" /></a>
                                                    <a href=""><img src="/images/product-details/similar3.jpg" alt="" /></a>
                                                </div>

                                            </div>

                                            <a class="left item-control" href="#similar-product" data-slide="prev">
                                                <i class="fa fa-angle-left"></i>
                                            </a>
                                            <a class="right item-control" href="#similar-product" data-slide="next">
                                                <i class="fa fa-angle-right"></i>
                                            </a>
                                        </div>

                                    </div>
                                    <div class="col-sm-7">
                                        <div class="product-information">
                                            <img src="images/product-details/new.jpg" class="newarrival" alt="" />
                                            <h2>{showedProduct.name}</h2>
                                            <p>Web ID: 1089772</p>
                                            <img src="images/product-details/rating.png" alt="" />
                                            <span>
                                                <span>US ${showedProduct.price}</span>
                                                <label>Quantity:</label>
                                                <input type="text" value="1" />
                                                {
                                                    showedProduct.quantity > 0 ? 
                                                    <button type="button" class="btn btn-fefault cart">
                                                        <i class="fa fa-shopping-cart"></i>
                                                        Add to cart
                                                    </button> : null
                                                }
                                            </span>
                                            <p><b>Availability:</b> {showedProduct.quantity > 0 ? "In Stock" : "No Stock"} </p>
                                            <p><b>Condition:</b> New</p>
                                            <p><b>Brand:</b> E-SHOPPER</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="category-tab shop-details-tab">
                                    <div class="col-sm-12">
                                        <ul class="nav nav-tabs">
                                            <li class="active"><a href="#details" data-toggle="tab">Details</a></li>
                                            <li ><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                                        </ul>
                                    </div>
                                    <div class="tab-content">
                                        <div class="tab-pane fade active in" id="details" >
                                            <div class="col-sm-3">
                                                <div class="product-image-wrapper">
                                                    <div class="single-products">
                                                        <p>{showedProduct.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane" id="reviews" >
                                            <div class="col-sm-12">
                                                <ul>
                                                    <li><a href=""><i class="fa fa-user"></i>EUGEN</a></li>
                                                    <li><a href=""><i class="fa fa-clock-o"></i>12:41 PM</a></li>
                                                    <li><a href=""><i class="fa fa-calendar-o"></i>31 DEC 2014</a></li>
                                                </ul>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                                <p><b>Write Your Review</b></p>

                                                <form action="#">
                                                    <span>
                                                        <input type="text" placeholder="Your Name" />
                                                        <input type="email" placeholder="Email Address" />
                                                    </span>
                                                    <textarea name="" ></textarea>
                                                    <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                                    <button type="button" class="btn btn-default pull-right">
                                                        Submit
                                                </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }
    return null
}

export default ProductDetail