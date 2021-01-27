import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//@desc create a new order
//@route POST /api/order
//@access Private
const createOrder = expressAsyncHandler(async (req, res) => {
  const orderDetails = req.body;

  if (!orderDetails) {
    res.status(400);
    throw new Error("Invalid order data");
  }

  const order = Order.create({
    user: orderDetails.user,
    orderItems: orderDetails.orderItems,
    shippingAddress: orderDetails.shippingAddress,
    paymentMethod: orderDetails.paymentMethod,
    totalPrice: orderDetails.totalPrice,
  });

  if (order) {
    res.status(201).json({
      message: "Success! New order was created",
    });
  } else {
    res.status(400);
    throw new Error("Invalid order data");
  }
});

//@desc create a new order
//@route Get /api/orders/details
//@access Private
const getOrderDetails = expressAsyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.params.id });
  let orderDetails = [];
 
  console.log("User", req.params.id, order);

  order.map((orderItem) => {
    orderDetails = [...orderDetails, ...orderItem.orderItems];
  });

  if (order) {
    res.status(201);
    res.json({
      orderItems: orderDetails,
      paymentMethod: order.paymentMethod,
    });
  } else {
    res.status(400);
    throw new Error("No order items was found");
  }
});

export { createOrder, getOrderDetails };
