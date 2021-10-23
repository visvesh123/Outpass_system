import React, { useState, useEffect } from "react";

import Logo from "./logo.png";
import "./SecNavBar.css";
// import { logoutUser } from "../../actions/authAction";
const SecNavbar = () => {

  const handleLogout = (props) => {
    // props.logoutUser();
  };

  return (
    <div>
      <header className="hello scroll">
        <a className="logo" href="">
          <img
            src={Logo}
            alt="Mahindra University"
            class="navbar-brand"
            width="240"
          />
        </a>
        <ul>
          <li>
            <h3 className="sec-portal">Approved Leave Tokens </h3>
          </li>

          <li>
            {/* <Link to="griev" smooth={true} duration={1000}>
              <span className="middle-main">Sign Out</span>
            </Link> */}
            <a
              className="middle1"
              style={({ float: "right" }, { fontSize: "25" })}
              href="/security-login"
              onClick={handleLogout}
            >
              Sign Out
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default SecNavbar;
