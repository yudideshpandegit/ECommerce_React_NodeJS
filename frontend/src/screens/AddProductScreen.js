import React, { Component } from "react";
import { connect } from 'react-redux';

import axios from "axios";

import { Container, Button, Alert } from "react-bootstrap";

import Loader from "../shared/loader/Loader";

import {
  validate,
  VALIDATOR_TYPE_REQUIRE,
} from "../shared/validators/validators";

import "./AddProductScreen.css";

export default class AddProductScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: "",
        errors: {
          required: false,
        },
        touched: false,
      },
      brand: {
        value: "",
        errors: {
          required: false,
        },
        touched: false,
      },
      category: {
        value: "",
        errors: {
          required: false,
        },
        touched: false,
      },
      description: {
        value: "",
        errors: {
          required: false,
        },
        touched: false,
      },
      price: {
        value: 0,
        errors: {
          required: false,
        },
        touched: false,
      },
      countInStock: {
        value: 0,
        errors: {
          required: false,
        },
        touched: false,
      },
      image:{
        value:''
      },
      error: false,
      upload: false,
    };
  }
  componentDidMount() {
    console.log("Add Product Screen");
  }

  handleChange(e, title) {
    let value = e.target.value;

    switch (title) {
      case "name": {
        this.setState({
          [title]: {
            ...this.state[title],
            value: value,
            errors: {
              required: validate(value, VALIDATOR_TYPE_REQUIRE),
            },
          },
        });

        break;
      }
      case "brand": {
        this.setState({
          [title]: {
            ...this.state[title],
            value: value,
            errors: {
              required: validate(value, VALIDATOR_TYPE_REQUIRE),
            },
            error:
              this.state.brand.touched && this.state.brand.errors?.required,
          },
        });

        break;
      }
      case "category": {
        this.setState({
          [title]: {
            ...this.state[title],
            value: value,
            errors: {
              required: validate(value, VALIDATOR_TYPE_REQUIRE),
            },
            error:
              this.state.category.touched &&
              this.state.category.errors?.required,
          },
        });

        break;
      }

      case "description": {
        this.setState({
          [title]: {
            ...this.state[title],
            value: value,
            errors: {
              required: validate(value, VALIDATOR_TYPE_REQUIRE),
            },
            error:
              this.state.description.touched &&
              this.state.description.errors?.required,
          },
        });

        break;
      }
      case "price": {
        this.setState({
          [title]: {
            ...this.state[title],
            value: value,
            errors: {
              required: validate(value, VALIDATOR_TYPE_REQUIRE),
            },
            error:
              this.state.price.touched && this.state.price.errors?.required,
          },
        });

        break;
      }
      case "countInStock": {
        this.setState({
          [title]: {
            ...this.state[title],
            value: value,
            errors: {
              required: validate(value, VALIDATOR_TYPE_REQUIRE),
            },
            error:
              this.state.countInStock.touched &&
              this.state.countInStock.errors?.required,
          },
        });

        break;
      }
    }

    console.log(this.state);
  }

  onTouchHandler(title) {
    this.setState({
      [title]: {
        ...this.state[title],
        touched: true,
      },
      error: this.state[title].touched && !this.state[title].errors?.required,
    });
  }

  async onUploadHandler(e) {
    console.log("Image uploader");
    const file = e.target.files[0];
    const formData = new FormData();
    
    formData.append('image', file);
    console.log(formData, file);

    this.setState({
      upload: true,
    });

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      this.setState({
        upload: false,
      });

      console.log(data);

    } catch (err) {
      console.log(err);
    }
  }

  onSubmitHandler(e) {
    e.preventDefault();
    console.log(this.state);
    let productData = {

    }
  }

  render() {
    return (
      <div className="add-product">
        <Container>
          <form onSubmit={(e) => this.onSubmitHandler(e)}>
            <div className="row">
              <div className="form-group">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  onBlur={() => this.onTouchHandler("name")}
                  onChange={(e) => this.handleChange(e, "name")}
                />
                {this.state.name.touched ? (
                  !this.state.name.errors.required ? (
                    <div>
                      <Alert variant="danger">
                        Please enter the product name
                      </Alert>
                    </div>
                  ) : null
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label className="form-label">Brand:</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Brand"
                  onBlur={() => this.onTouchHandler("brand")}
                  onChange={(e) => this.handleChange(e, "brand")}
                />
                {this.state.brand.touched ? (
                  !this.state.brand.errors.required ? (
                    <div>
                      <Alert variant="danger">
                        Please enter the brand name
                      </Alert>
                    </div>
                  ) : null
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label className="form-label">Category:</label>
                <select
                  className="form-control form-select form-select-sm"
                  id="exampleFormControlSelect1"
                  placeholder="Enter Category"
                  value={this.state.category.value}
                  onBlur={() => this.onTouchHandler("category")}
                  onChange={(e) => this.handleChange(e, "category")}
                >
                  <option value="laptop">laptop</option>
                  <option value="desktop">desktop</option>
                  <option value="mobile">mobile</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label className="form-label">Description:</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
                  onBlur={() => this.onTouchHandler("description")}
                  onChange={(e) => this.handleChange(e, "description")}
                />
                {this.state.description.touched ? (
                  !this.state.description.errors.required ? (
                    <div>
                      <Alert variant="danger">
                        Please enter the description name
                      </Alert>
                    </div>
                  ) : null
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Price:</label>

              <input
                type="number"
                className="form-control"
                placeholder="Enter Price"
                onBlur={() => this.onTouchHandler("price")}
                onChange={(e) => this.handleChange(e, "price")}
              />
              {this.state.price.touched ? (
                !this.state.price.errors.required ? (
                  <div>
                    <Alert variant="danger">Please enter the price name</Alert>
                  </div>
                ) : null
              ) : null}
            </div>
            <div className="form-group">
              <label className="form-label">Count In Stock:</label>

              <input
                type="number"
                className="form-control"
                placeholder="Enter Total Stock"
                onBlur={() => this.onTouchHandler("countInStock")}
                onChange={(e) => this.handleChange(e, "countInStock")}
              />
              {this.state.countInStock.touched ? (
                !this.state.countInStock.errors.required ? (
                  <div>
                    <Alert variant="danger">
                      Please enter the count in stock name
                    </Alert>
                  </div>
                ) : null
              ) : null}
            </div>

            <div className="form-group">
              <label className="form-label">Image:</label>

              <input
                type="file"
                className="form-control"
                placeholder="Enter Image"
                onChange={(e) => this.onUploadHandler(e)}
              />
            </div>
            {this.state.upload && <Loader />}
            <div className="row">
              <div className="form-group">
                <Button
                  type="submit"
                  varient="primary"
                  className="shipping__submit"
                  disabled={!this.state.error}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Container>
      </div>
    );
  }
}
