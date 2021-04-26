import { categoryConstansts } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
};

const categoryReducer = (state=initState,action) => {
    switch (action.type) {
        case categoryConstansts.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
            case categoryConstansts.ADD_NEW_CATEGORY_REQUEST:
                state = {
                    ...state,
                    loading: true
                }
                break;
            case categoryConstansts.ADD_NEW_CATEGORY_SUCCESS:
                const category = action.payload.category;
                
                state = {
                    ...state,
                    categories: [...state.categories,category],
                    loading: false,
                }
                break;
            case categoryConstansts.ADD_NEW_CATEGORY_FAILURE:
                state = {
                    ...initState,
                    loading: false,
                    error: action.payload.error
                }
                break;
        default:
            break;
    }

    return state
}

export default categoryReducer