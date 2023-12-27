import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import MyAccount from "./pages/other/MyAccount";


import LoginRegister from "./pages/other/LoginRegister";

const Home = lazy(() => import("./pages/home/Home"));

const Contact = lazy(() => import("./pages/other/Contact"));

const About = lazy(() => import("./pages/other/About"));

const Shop = lazy(() => import("./pages/shop/Shop"));

const Product = lazy(() => import("./pages/shop-product/Product"));

const Compare = lazy(() => import("./pages/other/Compare"));

const Wishlist = lazy(() => import("./pages/other/Wishlist"));

const Cart = lazy(() => import("./pages/other/Cart"));

const TermsAndCondition = lazy(() => import("./pages/policy/TermsAndCondition"));

const ReturnPolicy = lazy(() => import("./pages/policy/ReturnPolicy"));

const PrivacyPolicy = lazy(() => import("./pages/policy/PrivacyPolicy"));


const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Suspense
          fallback={
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/contact"} element={<Contact />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/shop"} element={<Shop />} />
            <Route path={"/shop/:id"} element={<Product />} />
            <Route path={"/compare"} element={<Compare />} />
            <Route path={"/wishlist"} element={<Wishlist />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path={"/terms-and-condition"} element={<TermsAndCondition />} />
            <Route path={"/return-policy"} element={<ReturnPolicy />} />
            <Route path={"/privacy-policy"} element={<PrivacyPolicy/>} />
            <Route path={"/my-account"} element={<MyAccount/>} />
            <Route path={"/login-register"} element={<LoginRegister/>} />

          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
