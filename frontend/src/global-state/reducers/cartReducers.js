import { CART_ADD_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../../constants/cartConstants";

export const cartReducer = (
    state = { cartItems: null, shippinAddress:null },
    action
  ) => {
    switch (action.type) {
      case CART_ADD_ITEM:
        {
          const item = action.payload;

          const existItem = state.cartItems.find(x => x.product === item.product);

          if(existItem){
            return{
                ...state,
                cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
            }
          } else {  
            return{
                ...state,
                cartItems:[...state.cartItems, item]
            }
          }
        }
        
  
        case CART_SAVE_SHIPPING_ADDRESS : {
          return{
            ...state,
            shippingDetails: action.payload
          }
        }
 
      default:
        return state;
    }
  };

