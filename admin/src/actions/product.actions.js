import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProducts = () => {
  return async (dispatch) => {
      dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });

      try {
      const res = await axios.get(`/products`);
      if (res.status === 200) {
        const { products } = res.data;
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
      } else {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (form) => {
  return async (dispatch) => {
      dispatch({ type: productConstants.ADD_PRODUCT_REQUEST })

      const res = await axios.post(`/products`, form);
      console.log(res);

      if (res.status === 201) {
        dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS, payload: {product: res.data.product} });
      } else {
        dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
      }
  };
};
