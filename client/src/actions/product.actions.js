import axios from "axios";
import { productConstants } from "./constants";

export const getProducts = () => {
  return async (dispatch) => {
      dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });

      try {
      const res = await axios.get(`http://localhost:3000/api/products`);
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