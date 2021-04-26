import React,{ useEffect,useState} from 'react'
import Home from './pages/Home';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import ProductDetail from './pages/ProductDetail';
import { useDispatch } from 'react-redux';
import { getAllCategory } from './actions/category.actions';
import { getProducts } from './actions/product.actions';
import Shop from './pages/Shop';
import { getCart } from './actions/cart.actions';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllCategory())
    dispatch(getProducts())
    dispatch(getCart())
    setLoading(true)
  }, [])

  if (loading === false) {
    return null
  }
  return (
    <Router >
      <Switch>
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/" component={Home} />
      <Route exact path="/:slug" component={Shop} />
      <Route exact path="/product/:slug" component={ProductDetail} />
      </Switch>
    </Router>
  );
}

export default App;
