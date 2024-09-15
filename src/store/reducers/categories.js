import {
  SET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../actions";

const initial = [];

const categoriesReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;

    case ADD_CATEGORY:
      return [...state, action.payload];

    case DELETE_CATEGORY:
      return [...state.filter((x) => x.id !== action.payload)];

    case UPDATE_CATEGORY:
      return [
        action.payload,
        ...state.filter((x) => x.id !== action.payload.id),
      ];

    default:
      return state;
  }
};

export default categoriesReducer;
