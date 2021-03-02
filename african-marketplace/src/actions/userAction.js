import axiosWithAuth from "../utils/axiosWithAuth";
export const USER_LOADING = 'USER_LOADING'
export const USER_FETCHED = 'USER_FETCHED'
export const USER_ITEMS_FETCHED = "USER_ITEMS_FETCHED"
export const ERROR_LOADING_USER = "ERROR_LOADING_USER"


export const user = (id) => {
    return (dispatch) => {
        dispatch({ type: USER_LOADING });
        axiosWithAuth()
          .get(`/users/${id}`)
          .then((response) => {
    
            dispatch({
              type: USER_FETCHED,
              payload: response.data,
            });
          })
          .catch((error) => {
    
            dispatch({
              type: ERROR_LOADING_USER,
              payload: error.response.data.message,
            });
          });
      };
}