import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector((state) => state.auth);
    const history = useHistory()
    console.log(history);
    return (
        <Route {...rest} render={props =>
            auth.authenticate ? (
                <div>
                    <Component {...props} />
                </div>
            )
                :
                (
                    <Redirect to='/signin' />
                )
        } />
    )
}

export default PrivateRoute;