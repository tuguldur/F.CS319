import React, { useContext } from "react";
import { Row, Col, Button, Menu, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./style.scss";
import { User } from "context/user";
import axios from "axios";
const Header = () => {
  const { user } = useContext(User);
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="3"
        style={{ color: "#a8071a" }}
        onClick={() =>
          axios.get("/api/auth/logout").then((response) => {
            response.data.status
              ? window.location.reload()
              : message.error("Some thing went wrong.");
          })
        }
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div id="header">
      <Row>
        <Col xs={24} sm={24} md={6} lg={6} xl={5} xxl={4}>
          <h1 className="brand">
            <Link to="/" className="logo">
              Brand
            </Link>
          </h1>
        </Col>
        <Col xs={0} sm={0} md={18} lg={18} xl={19} xxl={20}>
          <div className="header-menu-row">
            {user ? (
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  href="/"
                >
                  {user.name} <DownOutlined />
                </a>
              </Dropdown>
            ) : (
              <Link to="/auth">
                <Button shape="round" type="primary">
                  Нэвтрэх
                </Button>
              </Link>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Header;
