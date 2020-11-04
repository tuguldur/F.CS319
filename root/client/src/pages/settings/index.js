import React from "react";
import { Menu } from "antd";
import "./style.scss";
const Settings = () => {
  return (
    <div className="settings">
      <Menu mode="horizontal">
        <Menu.Item key="1">Navigation One</Menu.Item>
        <Menu.Item key="2">Navigation Two</Menu.Item>
        <Menu.Item key="3">Navigation Tree</Menu.Item>
      </Menu>
    </div>
  );
};
export default Settings;
