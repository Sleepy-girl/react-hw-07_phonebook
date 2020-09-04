import { combineReducers } from "redux";
import constantsTypes from "./constantsTypes";

// const initialState = [],

const itemsReduser = (state = [], { type, payload }) => {
  switch (type) {
    case constantsTypes.GET_SUCCESS:
      return payload;

    case constantsTypes.ADD_SUCCESS:
      return [...state, payload];

    case constantsTypes.REMOVE_CONTACT:
      return [...state.filter((item) => item.id !== payload.id)];

    default:
      return state;
  }
};

const errorReducer = (state = "", action) => {
  switch (action.type) {
    case constantsTypes.ADD_ERROR:
      return action.payload;

    case constantsTypes.ADD_REQUEST:
      return (state = "");

    default:
      return state;
  }
};

const filterReduser = (state = "", action) => {
  switch (action.type) {
    case constantsTypes.FILTER_VALUE:
      return action.payload.filter;

    default:
      return state;
  }
};

const alertReducer = (state = false, action) => {
  switch (action.type) {
    case constantsTypes.EXIST_CONTACT:
      return !state;

    default:
      return state;
  }
};

export default combineReducers({
  items: itemsReduser,
  filter: filterReduser,
  alert: alertReducer,
  error: errorReducer,
});
