import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart } from '../../actions/cart.actions'
import { ToastContainer, toast } from 'react-toastify';
import Layout from '../../components/Layout'

function Cart() {
    const cart = useSelector(state => state.cart)
    const product = useSelector(state => state.product)
    const dispatch = useDispatch()

    const handleDelete = (productId) => {
        dispatch(removeFromCart(productId))
        toast.warning(`Product removed from cart`, {
            position: "bottom-right",
        });
    }

    useEffect(() => {
    }, [cart, product])

    if (product.products.length > 0) {
        return (
            <Layout>
                <section id="cart_items">
                    <div className="container">
                        <div className="breadcrumbs">
                            <ol className="breadcrumb">
                                <li><a href="#">Home</a></li>
                                <li className="active">Shopping Cart</li>
                            </ol>
                        </div>
                        {cart.cartItems.length > 0 ?
                            <div className="table-responsive cart_info">
                                <table className="table table-condensed">
                                    <thead>
                                        <tr className="cart_menu">
                                            <td className="image">Item</td>
                                            <td className="description"></td>
                                            <td className="price">Price</td>
                                            <td className="quantity">Quantity</td>
                                            <td className="total">Total</td>
                                            <td></td>
                                        </tr>
                                    </thead>

                                    {cart && cart.cartItems.map((c, index) => {
                                        let prod = product.products.find(a => a._id === c.product)
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td className="cart_product">
                                                        <a href=""><img height={100} src={`http://localhost:3000/public/${prod.productPictures[0].img}`} alt="" /></a>
                                                    </td>
                                                    <td className="cart_description">
                                                        <h4><Link to={`/product/${prod.slug}`}>{prod.name}</Link></h4>
                                                        <p>Web ID: 1089772</p>
                                                    </td>
                                                    <td className="cart_price">
                                                        <p>${prod.price}</p>
                                                    </td>
                                                    <td className="cart_quantity">
                                                        <div className="cart_quantity_button">
                                                            <a className="cart_quantity_up" href=""> + </a>
                                                            <input className="cart_quantity_input" type="text" name="quantity" value={c.quantity} autocomplete="off" size="2" />
                                                            <a className="cart_quantity_down" href=""> - </a>
                                                        </div>
                                                    </td>
                                                    <td className="cart_total">
                                                        <p className="cart_total_price">${prod.price * c.quantity}</p>
                                                    </td>
                                                    <td className="cart_delete">
                                                        <a className="cart_quantity_delete" onClick={() => handleDelete(prod._id)}><i className="fa fa-times"></i></a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                            </div> : <div style={{ marginBottom: '25rem', fontSize: '4rem' }}>
                                <center>Your cart is empty</center>
                            </div>}
                    </div>
                </section>

                {cart.cartItems.length > 0 ?
                    <section id="do_action">
                        <div className="container">
                            <div className="heading">
                                <h3>What would you like to do next?</h3>
                                <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="chose_area">
                                        <ul className="user_option">
                                            <li>
                                                <input type="checkbox" />
                                                <label>Use Coupon Code</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" />
                                                <label>Use Gift Voucher</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" />
                                                <label>Estimate Shipping & Taxes</label>
                                            </li>
                                        </ul>
                                        <ul className="user_info">
                                            <li className="single_field">
                                                <label>Country:</label>
                                                <select>
                                                    <option>United States</option>
                                                    <option>Bangladesh</option>
                                                    <option>UK</option>
                                                    <option>India</option>
                                                    <option>Pakistan</option>
                                                    <option>Ucrane</option>
                                                    <option>Canada</option>
                                                    <option>Dubai</option>
                                                </select>

                                            </li>
                                            <li className="single_field">
                                                <label>Region / State:</label>
                                                <select>
                                                    <option>Select</option>
                                                    <option>Dhaka</option>
                                                    <option>London</option>
                                                    <option>Dillih</option>
                                                    <option>Lahore</option>
                                                    <option>Alaska</option>
                                                    <option>Canada</option>
                                                    <option>Dubai</option>
                                                </select>

                                            </li>
                                            <li className="single_field zip-field">
                                                <label>Zip Code:</label>
                                                <input type="text" />
                                            </li>
                                        </ul>
                                        <a className="btn btn-default update" href="">Get Quotes</a>
                                        <a className="btn btn-default check_out" href="">Continue</a>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="total_area">
                                        <ul>
                                            <li>Cart Sub Total <span>$59</span></li>
                                            <li>Eco Tax <span>$2</span></li>
                                            <li>Shipping Cost <span>Free</span></li>
                                            <li>Total <span>$61</span></li>
                                        </ul>
                                        <a className="btn btn-default update" href="">Update</a>
                                        <a className="btn btn-default check_out" href="">Check Out</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : null}
                <ToastContainer autoClose={3000} />
            </Layout>
        )
    }
    else {
        return null
    }
}

export default Cart
