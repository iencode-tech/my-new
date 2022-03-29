import React, { useEffect, useState } from "react";
import { Collapse } from "bootstrap";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { flush, selectIdentity } from "../../../store/redux/Identity";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const store = useSelector(selectIdentity);
  const dispatch = useDispatch();
  let [toggle, setToggle] = useState(false);

  const _logout = (e) => {
    e.preventDefault();
    dispatch(flush());
  };

  useEffect(() => {
    let myCollapse = document.getElementById("leftSideBarMenu");
    let bsCollapse = new Collapse(myCollapse, { toggle: false });
    toggle ? bsCollapse.show() : bsCollapse.hide();
  });

  return (
    <header className="navbar navbar-expand-md navbar-light bg-light fixed-top shadow border-app p-0">
      {/*className="navbar navbar-expand-lg navbar-light bg-light sticky-top flex-md-nowrap p-0 shadow border-app">*/}
      <div className="container-fluid">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">
          <img
            className="rounded-circle me-2"
            src="/admin/image/logo512.png"
            height="32"
            width="32"
            alt="logo"
          />
        </a>
        <button
          className="navbar-toggler d-md-none collapsed"
          type="button"
          aria-controls="leftSideBarMenu"
          aria-expanded="false"
          aria-label="Toggle left navigation"
          onClick={() => setToggle((currentToggle) => !currentToggle)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle bg-light text-dark border-0"
                type="button"
                id="userMenu"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  className="rounded-circle me-2"
                  src="/logo192_bck.png"
                  height="32"
                  width="32"
                  alt="user"
                />
                <span>{`${store.userData.firstName} ${store.userData.lastName}`}</span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="userMenu">
                <li>
                  <NavLink className="dropdown-item" to="/profile/edit">
                    Edit Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/change-password">
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <button className="dropdown-item btn btn-link" onClick={_logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
