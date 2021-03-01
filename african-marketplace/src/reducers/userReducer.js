//Imports Here ---------------------------------------
import {
    USER_LOADING,
    USER_FETCHED,
    USER_ITEMS_FETCHED,
    ERROR_LOADING_USER,
  } from "../actions/userAction";

//Initial State Here ----------------------------------
const initialState = {
    owner_id: null,
    ownerProfile: {},
    error: "",
    isLoading: false,
    itemsForSale: [],
  };

export const userReducer = (state = initialState, action) => {
    console.log('Action Payload: ', action.payload)
    switch (action.type) {
        case USER_LOADING:
          return {
            ...state,
            isLoading: true,
          };
        case USER_FETCHED:
          return {
            ...state,
            isLoading: false,
            ownerProfile: action.payload,
          };
        case USER_ITEMS_FETCHED:
          return {
            ...state,
            isLoading: false,
            itemsForSale: action.payload,
          };
        case ERROR_LOADING_USER:
          return {
            ...state,
            isLoading: false,
            error: action.payload,
          };
    
        default:
          return state;
      }
}