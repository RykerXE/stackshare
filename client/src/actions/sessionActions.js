import api from "../utils/api";
import { get } from "lodash";

export const SESSION_LOGIN_START = 'SESSION_LOGIN_START';
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS';
export const SESSION_LOGIN_FAIL = 'SESSION_LOGIN_FAIL';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export const login = (payload, history) => dispatch => {
  dispatch({
    type: SESSION_LOGIN_START,
  });
  api.post(`/auth/login`, { ...payload })
    .then(res => {
      const token = get(res, "data", null);
      localStorage.setItem("token", token);
      history.push(`/home`);
      window.location.reload(false);
      dispatch(loginSuccess(res.data, history))
    })
    .catch(err => {
      dispatch(loginFail(err.message))
    });
};

export const logout = () => dispatch => {
  localStorage.clear();
  window.location.reload(false);
  dispatch({
    type: SESSION_LOGOUT
  });
}
  

const loginSuccess = (payload, history) => ({
  type: SESSION_LOGIN_SUCCESS,
  payload,
  history,
});
  
const loginFail = error => ({
  type: SESSION_LOGIN_FAIL,
  payload: {
    error
  }
});