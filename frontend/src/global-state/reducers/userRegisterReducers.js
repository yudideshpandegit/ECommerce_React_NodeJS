import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../../constants/userContants";

export const userRegisterReducer = (
    state = { loading: false, userInfo: null, error: null },
    action
  ) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        {
          return { loading: true };
          break;
        }
  
      case USER_REGISTER_SUCCESS:
        {
          return { loading: false, userInfo: action.payload };
          break;
        }
  
      case USER_REGISTER_FAIL:
        {
          return { loading: false, error: action.payload };
          break;
        }
        
      default:
        return state;
    }
  };
  