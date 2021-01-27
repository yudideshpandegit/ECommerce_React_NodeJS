import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_DETAILS_FAIL,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
} from "../../constants/userContants";

export const userLoginReducer = (
  state = { loading: false, userInfo: null, error: null },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return { loading: true };
      break;
    }

    case USER_LOGIN_SUCCESS: {
      return { loading: false, userInfo: action.payload };
      break;
    }

    case USER_LOGIN_FAIL: {
      return { loading: false, error: action.payload };
      break;
    }

    case USER_LOGOUT: {
      return { loading: false, userInfo: null, error: null };
      break;
    }

    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = { loading: false, userInfo: null, error: null },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST: {
      return { loading: true };
      break;
    }

    case USER_DETAILS_SUCCESS: {
      return { loading: false, userInfo: action.payload };
      break;
    }

    case USER_DETAILS_FAIL: {
      return { loading: false, error: action.payload };
      break;
    }

    default:
      return state;
  }
};


export const userUpdateDetailsUser = (
  state = { loading: false, userInfo: null, success:false, error: null },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_DETAILS_REQUEST: {
      return { loading: true };
      break;
    }

    case USER_UPDATE_DETAILS_SUCCESS: {
      return { loading: false, success: true, userInfo: action.payload };
      break;
    }

    case USER_UPDATE_DETAILS_FAIL: {
      return { loading: false, error: action.payload };
      break;
    }

    default:
      return state;
  }
};
