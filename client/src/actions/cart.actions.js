import { localCartConstants } from "./constants";

export const getCart = () => {
    return async (dispatch) => {
        dispatch({ type: localCartConstants.GET_CART_ITEMS })
    }
}

export const removeFromCart = (product) => {
    return async (dispatch) => {
        dispatch({ type: localCartConstants.REMOVE_CART_ITEM_SUCCESS, payload: {product:product} })

        let products = JSON.parse(localStorage.getItem('cart'))
        console.log(products.filter(a => a.product !== product));
        localStorage.setItem('cart', JSON.stringify(products.filter(a => a.product !== product)))
    }
}


export const addTocart = (product, quantity = 1) => {
    return async (dispatch) => {
        dispatch({ type: localCartConstants.ADD_TO_CART_REQUEST });

        const cartItem = {
            product: product,
            quantity: quantity
        }

        dispatch({
            type: localCartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItem },
        });

        const carts = JSON.parse(localStorage.getItem("cart"))
        if (carts) {
            carts.push(cartItem)
            localStorage.setItem('cart', JSON.stringify(carts))
        }
        else {
            localStorage.setItem('cart', JSON.stringify([cartItem]))
        }
    }
}

