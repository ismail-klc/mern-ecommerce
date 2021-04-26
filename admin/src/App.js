import { Route, Switch } from 'react-router-dom';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import PrivateRoute from './components/PrivateRoute';
import Category from './pages/Category';
import Home from './pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllCategory, isUserLoggedIn, getProducts } from './actions';
import Product from './pages/Product';
import { BrowserRouter as Router } from "react-router-dom";


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    else {
      dispatch(getAllCategory())
      dispatch(getProducts())
    }
  }, [auth.authenticate])

  return (
    <Router >
      <Switch>
      <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/categories" component={Category} />
        <PrivateRoute path="/products" component={Product} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
