import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { listProductDetails } from "../global-state/actions/productActions";

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

import Loader from "../shared/loader/Loader";
import Message from "../shared/message/Message";
import Rating from "../shared/rating/Rating";

import "./ProductScreen.css";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match]);

  const productDetails = useSelector((state) => {
    console.log(state.productDetails);
    return state.productDetails;
  });

  const { loading, error, product } = productDetails;

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient={"danger"}>{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={4}>
              <Image src={product.image} alt={product._id.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup varient="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>
                    <Rating value={product.rating} /> in {product.numReviews}{" "}
                    reviews{" "}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p className="product__description">
                    <strong style={{ fontWeight: "bold", color: "black" }}>
                      Brand:{" "}
                    </strong>
                    {product.brand}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p className="product__description">{product.description}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p className="product__price">₹ {product.price}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card className="my-4 p-2 rounded text-center">
                <Card.Body>
                  <Card.Title>
                    <h4>{product.name}</h4>
                  </Card.Title>
                  <Card.Text as="div">
                    <div className="my-3">
                      <Row className = "py-3">
                        <Col>
                          <p className="product__description">
                            <strong
                              style={{ fontWeight: "bold", color: "black" }}
                            >
                              Total Price:
                            </strong>
                          </p>
                        </Col>
                        <Col>
                          <p className="product__description">
                            ₹ {product.price}
                          </p>
                        </Col>
                      </Row>
                      <Row className = "py-3">
                        <Col >
                          <p className="product__description">
                            <strong
                              style={{ fontWeight: "bold", color: "black" }}
                            >
                              Total Stock:
                            </strong>
                          </p>
                        </Col>
                        <Col>
                          <select className = "product__stock"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </Col>
                      </Row>
                      <div className="py-2">
                        <Button className="product__basket py-3" onClick = {() => addToCartHandler()}>
                          ADD TO BASKET
                        </Button>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
