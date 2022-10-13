import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStore } from "../../store/consumerBasket";
import CountersList from "./counters/countersList";
import localStorageSevice from "../../service/localStorage.service";

const NavBar = () => {
  const navigate = useNavigate();
  const basket = useSelector(getStore());
  const userId = localStorageSevice.getUserID();
  const [auth, setAuth] = useState();
  const [hid, setHid] = useState(true);
  useEffect(() => {
    setAuth(userId);
  }, [userId]);
  const handleLogOut = () => {
    localStorageSevice.removeAuthData();
    setAuth("");
    navigate("/");
  };
  const handleClick = () => {
    setHid(true);
    if (basket.length > 0) {
      setHid(!hid);
    }
  };
  return (
    <div className="position-relative">
      <nav className="navbar navbar-dark bg-primary">
        <div className="logo">
          <Link className="logo__main" aria-current="page" to="/">
            <img
              className="logo__main"
              src="/img/Venditore logo.png"
              alt="Logo"
            />
          </Link>
        </div>
        <ul className="nav mt-2">
          <li className="nav-item">
            <Link
              className="nav-link link-light"
              aria-current="page"
              to="/market/coffee"
            >
              Market
            </Link>
          </li>
          {auth && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link link-light"
                  aria-current="page"
                  to="/adminPanel/coffee"
                >
                  Admin Panel
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogOut}>
                  Выход
                </button>
              </li>
            </>
          )}
          {/* <li className="nav-item">
            <Link
              className="nav-link link-light"
              aria-current="page"
              to="/login"
            >
              Login
            </Link>
          </li> */}
          <li className="nav-item">
            <button
              onClick={handleClick}
              type="button"
              className="btn btn-primary position-relative me-4"
            >
              <i className="bi bi-cart3 fs-4"></i>
              {basket.length > 0 ? (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {basket.length}
                  <span className="visually-hidden">items in basket</span>
                </span>
              ) : (
                ""
              )}
            </button>
          </li>
        </ul>
      </nav>
      <div
        hidden={hid}
        className="position-absolute"
        style={{ top: "120%", right: "1rem", zIndex: "100" }}
      >
        <CountersList />
      </div>
    </div>
  );
};

export default NavBar;
