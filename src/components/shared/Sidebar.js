import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Sidebar = () => {
  return (
    <header className="main-nav">
      <div className="sidebar-user text-center">
        <img
          className="img-90 rounded-circle"
          src="assets/images/dashboard/1.png"
          alt=""
        />

        <a href="user-profile.html">
          <h6 className="mt-3 f-14 f-w-600">Emay Walter</h6>
        </a>
        <p className="mb-0 font-roboto">Human Resources Department</p>
      </div>
      <nav>
        <div className="main-navbar">
          <div id="mainnav">
            <ul className="nav-menu custom-scrollbar">
              <li className="back-btn">
                <div className="mobile-back text-end">
                  <span>Back</span>
                  <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
                </div>
              </li>
            </ul>
          </div>
          <div className="right-arrow" id="right-arrow">
            <i data-feather="arrow-right"></i>
            <FontAwesomeIcon icon="fas fa-home" />
          </div>
        </div>
      </nav>
    </header>
  );
};
