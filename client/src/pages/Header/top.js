import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signout } from '../../actions/auth.actions'

function HeaderTop(props) {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(signout())
        console.log(123);

    }

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
                                <li><Link to="/cart"><i className="fa fa-shopping-cart">
                                </i> Cart <span className="badge badge-warning">{cart.cartItems.length}</span> </Link>
                                </li>
                                {
                                    props.auth.authenticate ? null :
                                        <li><Link to="/login"><i className="fa fa-lock"></i> Login</Link></li>
                                }
                                {
                                    !props.auth.authenticate ? null :
                                        <li><a className="btn" onClick={handleLogout}><i className="fa fa-lock"></i> Logout</a></li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(HeaderTop)
