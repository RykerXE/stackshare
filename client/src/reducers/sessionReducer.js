import * as actionTypes from '../actions';

const sessionReducer = async (state = {}, action) => {
  switch (action.type) {

    case actionTypes.SESSION_LOGIN_START: {
      return {
        ...state,
        loggedIn: false,
        loading: true,
        error: null,
      };
    }

    case actionTypes.SESSION_LOGIN_SUCCESS: {
      return {
        loading: false,
        loggedIn: true,
        ...state,
      };
    }

    case actionTypes.SESSION_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.payload.error
      };

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;