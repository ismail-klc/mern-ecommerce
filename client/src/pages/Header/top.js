import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function HeaderTop() {
    const cart = useSelector(state => state.cart)

    useEffect(() => {
    }, [cart.cartItems])
    
    return (
        <div className="header-middle">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 clearfix">
                        <div className="logo pull-left">
                            <Link to="/"><img src="/images/home/logo.png" alt="" /></Link>
                        </div>
                    </div>
                    <div className="col-md-8 clearfix">
                        <div className="shop-menu clearfix pull-right">
                            <ul className="nav navbar-nav">
                                <li><a href=""><i className="fa fa-user"></i> Account</a></li>
                                <li><Link to="/checkout"><i className="fa fa-crosshairs"></i> Checkout</Link></li>
                                <li><Link to="/cart"><i className="fa fa-shopping-cart">
                                    </i> Cart <span className="badge badge-danger">{cart.cartItems.length}</span> </Link>
                                    </li>
                                <li><a href="login.html"><i className="fa fa-lock"></i> Login</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop
