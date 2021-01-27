import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../../constants/orderConstants";

export const createOrder = (
    state = { orderDetails: null, loading: false, success: false, error: null },
    action
  ) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        {
          return { loading: true };
        }
        break;
  
      case ORDER_CREATE_SUCCESS:
        {
          return { loading: false, orderDetails: action.payload, success:true };
        }
        break;
  
      case ORDER_CREATE_FAIL:
        {
          return { loading: false, error: action.payload, success: false };
        }
        break;
  
      default:
        return state;
    }
  };

  