import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIdentity, sync } from "../../store/redux/Identity";
import "./AuthLayout.scss";
import LeftSideBar from "../../components/layout/leftsidebar/LeftSideBar";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import { Redirect } from "react-router-dom";

function AuthLayout({ children }) {
  const store = useSelector(selectIdentity);
  const dispatch = useDispatch();
  let checkIdentity;

  useEffect(() => {
    dispatch(sync());
    checkIdentity = setInterval(() => dispatch(sync()), 1200000);
  }, []);

  useEffect(() => () => clearInterval(checkIdentity), []);

  return store.auth === false && store.loading === false ? (
    <Redirect to="/login" />
  ) : (
    <>
      <Header />
      <div className="container-fluid mt-5">
        <div className="row">
          <LeftSideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-3 mb-5">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AuthLayout;
