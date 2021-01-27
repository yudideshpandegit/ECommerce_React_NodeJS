import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../../constants/orderConstants";

import axios from "axios";

export const createOrderAction = (orderDetails) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo.token);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log("In order action");

    const { data } = await axios.post("/api/orders", orderDetails, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
