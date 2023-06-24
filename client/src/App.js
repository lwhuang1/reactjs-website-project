import './App.css';
import './News.css';
import './Shop.css';
import './Subscribe.css';

import Topbar from "./scenes/global/Topbar";

import Home from "./scenes/home";
import Shop from "./scenes/shop";
import Login from "./scenes/login";
import About from "./scenes/about";
import Register from "./scenes/register";
import NotFound from "./scenes/notFound";
import Checkout from "./scenes/checkout";
import Subscribe from "./scenes/subscribe";
import Completion from "./scenes/success"
import ForgotPassword from "./scenes/forgotPassword";

import Account from "./scenes/account";

import Footer from "./components/Footer";
import CartProvider from "./components/CartContext"

import { Routes, Route } from "react-router-dom"; // BrowserRouter, Link

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import React, { useState, useEffect } from 'react';

import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {

  const [stripePromise, setStripePromise] = useState(null)
  // const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    fetch("http://localhost:4000/config").then(async (r) => {
      const { publishableKey } = await r.json()
      console.log('publishable key', publishableKey)
      setStripePromise(loadStripe(publishableKey))
    });
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:4000/create-payment-intent", {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //   }).then(async (result) => {
  //     console.log('the result', result)
  //     var { clientSecret } = await result.json()
  //     console.log(clientSecret, 'the secret')
  //     setClientSecret(clientSecret)
  //   });
  // }, []);

  return (
    <div className="app">
      <main className="content">
        <Topbar />
        <Elements stripe={stripePromise} >
        <CartProvider>
        <div className='page-content'> 
          <Routes>
            <Route exact path='/home' element={<Home />}></Route>
            <Route exact path='/about' element={<About />}></Route>
            <Route exact path='/shop' element={<Shop />}></Route>
            <Route exact path='/completion' element={<Completion />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path='/choose-subscription' element={<Subscribe />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
          <Footer/>
        </div>
        </CartProvider>
        </Elements>
      </main>
    </div>
  )
}

export default App;
