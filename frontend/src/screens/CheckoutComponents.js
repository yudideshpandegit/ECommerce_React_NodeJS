import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./CheckoutComponents.css";
import { saveShippingAddress } from "../global-state/actions/cartActions";
import { createOrderAction } from "../global-state/actions/orderActions";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";

import { Link } from "react-router-dom";

import { Button, Col, ListGroup, Row, Image } from "react-bootstrap";
import { Card } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const CheckoutComponents = ({ history }) => {
  let totalCost = 0;

  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState();
  const [tabNumber, setTabNumber] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(false);

  const [loading, setloading] = useState(true);
  const [userData, setUserData] = useState();
  const [loadingUserData, setLoadingUserData] = useState(true);

  const dispatch = useDispatch();

  const { shippingDetails, cartItems } = useSelector((state) => {
    return state.cart;
  });

  const { userInfo } = useSelector((state) => {
    return state.userLogin;
  });

  const { success } = useSelector((state) => {
    return state.orderState;
  });

  useEffect(() => {
    if (shippingDetails) {
      setAddress(shippingDetails.address);
      setCity(shippingDetails.city);
      setPostalCode(shippingDetails.postalCode);
      setCountry(shippingDetails.country);
    }

    if (cartItems) {
      setloading(false);
    }

    if (userInfo) {
      console.log(userInfo);
      setUserData(userInfo);
      setLoadingUserData(false);
    }

    if (success) {
      history.push("/");
    }
  }, [setAddress, setCity, setPostalCode, setCountry, cartItems]);

  const shippingDetailsSubmit = (e) => {
    e.preventDefault();

    console.log("Shipping Details");

    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
  };

  const onTabChange = (e, tabNumber) => {
    setTabNumber(tabNumber);
  };

  const checkoutHandler = () => {
    let orderDetails = {
      user: userData._id,
      orderItems: cartItems,
      shippingAddress: {
        address,
        city,
        postalCode,
        country,
      },
      paymentMethod: "Cash On Delivery",
      totalPrice: totalCost,
    };

    dispatch(createOrderAction(orderDetails));
  };

  return (
    <>
      <Tabs value={tabNumber} className="tab__number" onChange={onTabChange}>
        <Tab label="SHIPPING DETAILS" {...a11yProps(0)} />
        <Tab label="PAYMENT METHOD" {...a11yProps(1)} />
        <Tab label="CHECKOUT REVIEW" {...a11yProps(2)} />
      </Tabs>
      <hr></hr>

      <TabPanel value={tabNumber} index={0}>
        <div className="shipping__content">
          <h2 className="shipping__content__title">Shipping Address</h2>
          <form onSubmit={(e) => shippingDetailsSubmit(e)}>
            <div className="row">
              <div className="form-group">
                <label className="form-label">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label className="form-label">City:</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label className="form-label">Postal Code:</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label className="form-label">Country:</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Country"
                  valuse={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <Button
                  type="submit"
                  varient="primary"
                  className="shipping__submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </TabPanel>
      <TabPanel value={tabNumber} index={1}>
        <div className="payment__method">
          <h2 className="payment__method__title">PAYMENT METHOD</h2>
          <p>Cash On Delivery</p>
        </div>
      </TabPanel>
      <TabPanel value={tabNumber} index={2}>
        <Row>
          <Col md={8}>
            <div className="checkout__details">
              <div className="checkout__details__component">
                <h2>PAYMENT METHOD</h2>
                <hr />
                <p>
                  <strong>Method:</strong>Cash On Delivery
                </p>
              </div>
              <div className="checkout__details__component">
                <h2>MY ORDER</h2>
                <hr />

                {loading ? null : (
                  <ListGroup varient="flush">
                    {cartItems.map((cartItem, index) => {
                      return (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={cartItem.image}
                                alt={cartItem.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/products/${cartItem.product}`}>
                                {cartItem.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {`${cartItem.qty} x ${cartItem.price} = ${
                                cartItem.qty * cartItem.price
                              }`}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                )}
              </div>

              <div className="checkout__details__component">
                <h2>MY DETAILS</h2>
                {loadingUserData ? null : (
                  <div className="customer__details">
                    <table className="table">
                      <tr>
                        <td>Name:</td>
                        <td>{userData.name}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>{userData.email}</td>
                      </tr>
                      <tr>
                        <td>Address:</td>
                        <td>{address}</td>
                      </tr>
                      <tr>
                        <td>City:</td>
                        <td>{city}</td>
                      </tr>
                      <tr>
                        <td>Postal Code:</td>
                        <td>{postalCode}</td>
                      </tr>
                      <tr>
                        <td>Country;</td>
                        <td>{country}</td>
                      </tr>
                    </table>
                  </div>
                )}

                <hr />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <Card className="checkout__summary">
              <h2>PRODUCT SUMMARY</h2>
              <table className="table">
                {cartItems.map((cartItem) => {
                  totalCost = totalCost + cartItem.price * cartItem.qty;

                  return (
                    <tr>
                      <td>{cartItem.name}</td>
                      <td>
                        <strong>{cartItem.price * cartItem.qty}</strong>
                      </td>
                    </tr>
                  );
                })}
                <tfoot>
                  <hr />
                  <tr>
                    <th>
                      <strong>Total Cost</strong>
                    </th>
                    <th>
                      <strong>{totalCost}</strong>
                    </th>
                  </tr>
                </tfoot>
              </table>

              <Button className="w-100" onClick={() => checkoutHandler()}>
                CHECKOUT
              </Button>
            </Card>
          </Col>
        </Row>
      </TabPanel>
    </>
  );
};
