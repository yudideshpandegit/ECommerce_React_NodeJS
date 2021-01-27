import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../global-state/actions/cartActions";
import Message from "../shared/message/Message";

import "./CartScreen.css";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  console.log(qty, productId);
  const [removeQty, setRemoveQty] = useState(qty);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <>
      <Row>
        <Col md={8}>
          <Row>
            <h1>SHOPPING CART</h1>
          </Row>
          <Row>
            <h3>Total number of items: {cartItems.length}</h3>
          </Row>
          <Row className="cart__content">
            <ListGroup varient="flush">
              {cartItems.map((cartItem) => {
                return (
                  <ListGroup.Item>
                    <Row>
                      <Col xs={2}>1</Col>
                      <Col xs={5}>
                        <h6>{cartItem.name}</h6>
                      </Col>
                      <Col xs={1}>{cartItem.countInStock}</Col>
                      <Col xs={2}>
                        <select
                          className="cartScreen__stock"
                          value={removeQty}
                          onChange={(e) => setRemoveQty(e.target.value)}
                        >
                          {[...Array(cartItem.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Row>
        </Col>

        <Col md={4}>
          <Card className="p-2">
            <h1 className="p-2">SUBTOTALS ITEMS</h1>

            <div className="py-5">
              <Link to="/checkout-component">
                <Button className="w-100 px-2">PROCEED TO CHECKOUT</Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
