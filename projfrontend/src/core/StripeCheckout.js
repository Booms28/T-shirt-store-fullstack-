import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    success: false,
    loading: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;

    products.map((p) => {
      amount = amount + p.price;
    });

    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        //call further methods
        const { status } = response;
        console.log("STATUS", status);
        const orderData = {
          products: products,
          transaction_id: response.transaction_id,
          amount: response.transaction.amount,
        };
        createOrder(userId, token, orderData);
      })

      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51HP1W0J9gFpkUvxTl1BSuTtvBy1qmIT5ZJluQVD4MfO7Tjw7mclpSXXKl2P2T1Nov5a48qg0lDvukjImKe0WiUfw001xI5ma2G"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy T-Shirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay With Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe checkout{getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};
export default StripeCheckout;
