import api from "../utils/api";

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const getUser = () => dispatch => {
  dispatch({
    type: GET_USER,
  });
  api.post(`/user/getuser`, {})
    .then(res => {
      dispatch(getUserSuccess(res.data));
    })
    .catch(err => {
      dispatch(getUserFail(err));
    });
};
  
const getUserSuccess = (payload) => ({
  type: GET_USER_SUCCESS,
  payload,
});
  
const getUserFail = error => ({
  type: GET_USER_FAILURE,
  payload: {
    error
  }
});