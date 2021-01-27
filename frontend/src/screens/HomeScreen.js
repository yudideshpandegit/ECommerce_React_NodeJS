import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { listProducts } from "../global-state/actions/productActions";

import { Row, Col } from "react-bootstrap";
import Product from "../components/product/Product";
import Loader from "../shared/loader/Loader";
import Message from "../shared/message/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => {
    return state.productList;
  });
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // const products = [];

  return (
    <div>
      <h1>Welcome to techbiz</h1>
      <h1>Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient={"danger"}>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
