import React, { useEffect, useState } from "react";
import "./Navigation.css";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../global-state/actions/userLoginActions";

import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";

function Navigation() {
  const [productSubMenuOpen, setProductSubMenuOpen] = useState(false);
  const [loginSubMenuOpen, setLoginSubMenuOpen] = useState(false);
  const [profileMode, setProfileMode] = useState(false);
  const [profileName, setProfileName] = useState("LOGIN");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (userInfo) {
      let userName = userInfo.name.split(" ")[0].substring(0, 5).toUpperCase();
      setProfileMode(true);
      setProfileName(userName);
    } else {
      setProfileMode(false);
      setProfileName("LOGIN");
    }
  }, [userInfo]);

  return (
    <div className="main__navigation">
      <div className="navigation">
        <ul className="navigation-bar">
          <li>
            <Link className="navigation-bar__link">
              <i className="fa fa-fw fa-home"></i>HOME
            </Link>
          </li>
          <li
            onMouseOver={() => {
              setProductSubMenuOpen(true);
            }}
            onMouseLeave={() => {
              setProductSubMenuOpen(false);
            }}
          >
            <Link className="navigation-bar__link navigation-bar__link__product">
              PRODUCTS
            </Link>

            {productSubMenuOpen && (
              <div className="product__sub-menu">
                <ul className="product__sub-menu__list">
                  <li>
                    <Link className="product__sub-menu__link">SERVICES</Link>
                  </li>
                  <li>
                    <Link className="product__sub-menu__link">ABOUT US</Link>
                  </li>
                  <li>
                    <Link className="product__sub-menu__link">AVATAR</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <Link className="navigation-bar__link">ABOUT US</Link>
          </li>

          <li
            onMouseOver={() => {
              setLoginSubMenuOpen(true);
            }}
            onMouseLeave={() => {
              setLoginSubMenuOpen(false);
            }}
          >
            {userInfo ? (
              <Link  className="navigation-bar__link navigation-bar__link__product">
                {profileName}
              </Link>
            ) : (
              <Link to = '/login' className="navigation-bar__link navigation-bar__link__product">
                LOGIN
              </Link>
            )}

            {profileMode && loginSubMenuOpen && (
              <div className="product__sub-menu">
                <ul className="product__sub-menu__list">
                  <li>
                    <Link to = "/profile" className="product__sub-menu__link">PROFILE</Link>
                  </li>
                  <li>
                    <Link
                      className="product__sub-menu__link"
                      onClick={() => logOut()}
                    >
                      SIGN OUT
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <Link to = '/cart' className="navigation-bar__link">
              <ShoppingCartIcon />
              Cart
            </Link>
          </li>
        </ul>
      </div>

      <div className="navigation-bar__laptop"></div>
      {/* <Modal
        show={showLoginModal}
        onCancel={onCloseLogin}
        modalClassName="login__modal"
        header="Are you sure?"
        footer={
          <React.Fragment>
            <button onClick={() => onCloseLogin()}>CANCEL</button>
          </React.Fragment>
        }
      >
        <div className="login">
          <div className="row">
            <CloseIcon
              className="login__close"
              onClick={() => onCloseLogin()}
            />
          </div>
          <div className="row login__title">
            <h1>Login</h1>
          </div>

          <div className="login__form">
            {loginMode && (
              <div className="row">
                <div className="col-sm-4">
                  <label htmlFor="name">Name:</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                  />
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-sm-4">
                <label htmlFor="email">Email address:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4">
                <label htmlFor="password">Password:</label>
              </div>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="row">
              <button type="button" className="btn btn-primary login__button">
                Login
              </button>
            </div>

            <div className="row">
              <p
                className="switch___link"
                onClick={() => setLoginMode(!loginMode)}
              >
                {loginMode ? "Create a new account" : "Already have an account"}
              </p>
            </div>
          </div>
        </div>
      </Modal> */}
    </div>
  );
}

export default Navigation;
