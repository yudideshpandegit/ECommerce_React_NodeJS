import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Container } from "react-bootstrap";

import Navigation from "./shared/header/Navigation";
import Footer from "./shared/footer/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./shared/login-modal/login";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { CheckoutComponents } from "./screens/CheckoutComponents";
import AdminScreen from "./screens/AdminScreen";
import AddProductScreen from "./screens/AddProductScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <main className="main-content">
          <Route path={`/login`} component={LoginScreen} />
          <Route path={`/product/:id`} component={ProductScreen} />
          <Route path={`/add-product`} component={AddProductScreen} />
          <Route path={`/cart/:id?`} component={CartScreen} />
          <Route path={`/profile`} component={ProfileScreen} />
          <Route path={`/admin`} component={AdminScreen} />
          <Route path={`/checkout-component`} component={CheckoutComponents} />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
