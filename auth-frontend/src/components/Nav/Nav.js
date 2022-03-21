//imports react and items from react-router-dom and nav.css
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";

export class Nav extends Component {
  render() {
    console.log(this.props);
    return (
      <nav className="navbar">
        <div className="h1-logo">
          <h1>
            <Link className="nav__link__mwf" to="/">
              Movie with friends!
            </Link>
          </h1>
        </div>
        <div className="right-side-nav">
          <ul>
            <li>
              {this.props.user ? (
                <NavLink
                  className="nav__link"
                  activeClassName="selected"
                  to="/movie"
                >
                  Movie Search
                </NavLink>
              ) : (
                ""
              )}
            </li>
            <li>
              {this.props.user ? (
                <NavLink
                  className="nav__link"
                  activeClassName="selected"
                  to="/create-friend"
                >
                  Create Friend
                </NavLink>
              ) : (
                ""
              )}
            </li>
            <li>
              {this.props.user ? (
                <div className="large__section__nav">
                  <span id="welcome">
                    Welcome Back - {this.props.user.email}
                  </span>
                  <NavLink
                    id="update__profile"
                    className="nav__link"
                    activeClassName="selected"
                    to="/profile"
                  >
                    Update Profile
                  </NavLink>
                </div>
              ) : (
                <NavLink
                  className="nav__link"
                  activeClassName="selected"
                  to="/sign-up"
                >
                  Sign up
                </NavLink>
              )}
            </li>
            <li id="logout__id">
              {this.props.user ? (
                <NavLink
                  className="nav__link"
                  to="/"
                  onClick={this.props.handleUserLogout}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  className="nav__link"
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Nav;
