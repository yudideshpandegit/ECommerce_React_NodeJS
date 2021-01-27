import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";

import {
  userLoginReducer,
  userDetailsReducer,
  userUpdateDetailsUser,
} from "./reducers/userLoginReducer";

import { userRegisterReducer } from "./reducers/userRegisterReducers";

import { cartReducer } from "./reducers/cartReducers";

import { createOrder } from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateDetailsUser,
  orderState: createOrder,
  cart: cartReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? {
      loading: false,
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      error: null,
    }
  : { loading: false, userInfo: null, error: null };

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingDetailsFromStorage = localStorage.getItem("shippingDetails")
  ? JSON.parse(localStorage.getItem("shippingDetails"))
  : null;

const initailState = {
  userLogin: userInfoFromStorage,
  cart: { cartItems: cartItemsFromStorage, shippingDetails: shippingDetailsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initailState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
