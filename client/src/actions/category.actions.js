// import axios from "../helpers/axios";
import { categoryConstansts } from "./constants";
import axios from 'axios'

export const getAllCategory = () => {
    return async (dispatch) => {

        dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get(`http://localhost:3000/api/categories`);

        console.log(res);
        if (res.status === 200) {

            const { categories } = res.data;

            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categories }
            });
        } else {
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}