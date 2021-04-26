import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import authReducer from './auth.reducers'
import categoryReducer from './category.reducer'
import productReducer from './product.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    category: categoryReducer,
    product: productReducer
});

export default rootReducer;