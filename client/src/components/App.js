/** @format */

import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import ProductPage from "./views/Product/ProductPage";
import ProductAddPage from "./views/Product/Sections/ProdcutAddPage";
import ProductDetailPage from "./views/Product/Sections/ProductDetailPage";
import SubScribePaymentPage from "./views/Product/Sections/SubScribePaymentPage";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/list" component={Auth(ProductPage, true)} />
          <Route exact path="/product/detail/:productId" component={Auth(ProductDetailPage, true)} />
          <Route exact path="/product/subscribe/:productId" component={Auth(SubScribePaymentPage, true)} />
          <Route exact path="/product/add" component={Auth(ProductAddPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
