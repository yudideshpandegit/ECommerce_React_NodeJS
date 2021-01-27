import React from "react";

import { Link } from "react-router-dom";

import { Card, Button } from "react-bootstrap";
import Rating from "../../shared/rating/Rating";

import "./Products.css";

const Product = ({ product }) => {
  const addToBasker = () => {};

  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
      <Card className="my-4 p-4 rounded text-center">
        <Card.Img src={product.image} varient="top" />

        <Card.Body>
          <Card.Title>
            <h3>
              <strong>
                {product.name.length > 25
                  ? product.name.substring(0, 25) + "..."
                  : product.name}
              </strong>
            </h3>
          </Card.Title>
          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              from {product.numReviews} reviews
            </div>
          </Card.Text>
          <Card.Text as="h3">{product.price}</Card.Text>
          <Button variant="primary">ADD TO BASKET</Button>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Product;
