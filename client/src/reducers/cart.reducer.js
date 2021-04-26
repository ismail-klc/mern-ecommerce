import { cartConstants } from "../actions/constants";

const initState = {
    cartItems: [],
    updatingCart: false,
    error: null
};

const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case cartConstants.REMOVE_CART_ITEM_SUCCESS:
            state = {
                ...state,
                cartItems: [...state.cartItems.filter(a => a.product !== action.payload.product)]
            }
            break;
        case cartConstants.GET_CART_ITEMS:
            let items 
            if (localStorage.getItem('cart') ) {
                items = JSON.parse(localStorage.getItem('cart')) 
            } else {
                items = []
            }
            state = {
                ...state,
                cartItems: [...items]
            }
            break;
        case cartConstants.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updatingCart: true
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                cartItems: [...state.cartItems, action.payload.cartItem],
                updatingCart: false
            }
            break;
        case cartConstants.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            break;
        case cartConstants.RESET_CART:
            state = {
                ...initState
            }
    }
    return state;
}

export default cartReducer