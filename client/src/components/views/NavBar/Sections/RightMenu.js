/**
 * /* eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */

import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    console.log(user.userData);
    if (user.userData && user.userData.role == 2) {
      return (
        <Menu mode={props.mode}>
          <Menu.Item key="upload">
            <a href="/product/list">product</a>
          </Menu.Item>
          <Menu.Item key="logout">
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu mode={props.mode}>
          <Menu.Item key="logout">
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
        </Menu>
      );
    }
  }
}

export default withRouter(RightMenu);
