import React, { useContext, useState } from "react";
import { Col, Affix, Menu } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";
import { User } from "context/user";
const MainMenu = () => {
  const { user } = useContext(User);
  const general = [
    { key: "1", label: "Dashboard", path: "/dashboard" },
    { key: "2", label: "Settings", path: "/settings" },
  ];
  const users = [
    { key: "3", label: "Users", path: "/users" },
    { key: "4", label: "Invoice", path: "/invoice" },
  ];
  const post = [
    { key: "5", label: "Posts", path: "/posts" },
    { key: "6", label: "Reports", path: "/reports" },
  ];
  var find = [...general, ...users, ...post].find(
    (link) => window.location.pathname === link.path
  )
    ? window.location.pathname !== "/auth"
      ? [...general, ...users, ...post].find(
          (link) => window.location.pathname === link.path
        ).key
      : "1"
    : "1";
  const [current, setCurrent] = useState(find);
  return user && window.location.pathname !== "/auth" ? (
    <Col md={6} lg={6} xl={5} xxl={4} className="main-menu">
      <Affix offsetTop={0}>
        <div className="main-menu-inner">
          <Menu
            mode="inline"
            onClick={(e) => setCurrent(e.key)}
            selectedKeys={[current]}
            className="aside-container"
          >
            <Menu.ItemGroup key="1" title="General">
              {general.map((link) => (
                <Menu.Item key={link.key}>
                  <Link to={link.path}>{link.label}</Link>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
            <Menu.ItemGroup key="2" title="User">
              {users.map((link) => (
                <Menu.Item key={link.key}>
                  <Link to={link.path}>{link.label}</Link>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
            <Menu.ItemGroup key="3" title="Post">
              {post.map((link) => (
                <Menu.Item key={link.key}>
                  <Link to={link.path}>{link.label}</Link>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          </Menu>
        </div>
      </Affix>
    </Col>
  ) : null;
};
export default MainMenu;
