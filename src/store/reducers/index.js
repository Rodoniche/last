import { combineReducers } from "redux";

import categoriesReducer from "./categories"

const reducer = combineReducers({
    categories: categoriesReducer
});

export default reducer;
