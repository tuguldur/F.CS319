import React, { useState } from "react";
import { Col, Affix, Menu } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";
const MainMenu = () => {
  const general = [
    { key: "1", label: "Хянах самбар", path: "/dashboard" },
    { key: "2", label: "Тохиргоо", path: "/settings" },
  ];
  const users = [
    { key: "3", label: "Сургууль", path: "/schools" },
    { key: "4", label: "Тэнхим", path: "/department" },
    { key: "5", label: "Багш", path: "/teachers" },
    { key: "6", label: "Оюутнууд", path: "/students" },
  ];
  var find = [...general, ...users].find(
    (link) => window.location.pathname === link.path
  )
    ? window.location.pathname !== "/auth"
      ? [...general, ...users].find(
          (link) => window.location.pathname === link.path
        ).key
      : "1"
    : "1";
  const [current, setCurrent] = useState(find);
  return (
    <Col md={6} lg={6} xl={5} xxl={4} className="main-menu">
      <Affix offsetTop={0}>
        <div className="main-menu-inner">
          <Menu
            mode="inline"
            onClick={(e) => setCurrent(e.key)}
            selectedKeys={[current]}
            className="aside-container"
          >
            <Menu.ItemGroup key="1" title="Үндсэн">
              {general.map((link) => (
                <Menu.Item key={link.key}>
                  <Link to={link.path}>{link.label}</Link>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
            <Menu.ItemGroup key="2" title="">
              {users.map((link) => (
                <Menu.Item key={link.key}>
                  <Link to={link.path}>{link.label}</Link>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          </Menu>
        </div>
      </Affix>
    </Col>
  );
};
export default MainMenu;
