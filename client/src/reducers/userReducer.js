import * as actionTypes from '../actions';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_USER: {
      return {
        ...state,
        loading: true
      };
    }

    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload
      };
    case actionTypes.GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default: {
      return state;
    }
  }
};

export default userReducer;
