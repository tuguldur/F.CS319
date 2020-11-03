import React, { useState, useContext } from "react";
import { Form, Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { User } from "context/user";
import "./style.scss";
const Auth = () => {
  const { user } = useContext(User);
  const [form] = Form.useForm();
  const [error, setError] = useState({});
  const onFinish = (values) => {
    setError({});
    axios.post("/api/auth/login", { ...values }).then((response) => {
      let errors = response.data.errors;
      if (!response.data.status) {
        errors
          ? errors.map((err) => setError({ [err.param]: err.msg }))
          : setError({ failed: response.data.msg });
      }
      if (response.data.status) {
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="auth">
      {user ? (
        <Redirect to="/" />
      ) : (
        <Form name="auth" layout={"vertical"} onFinish={onFinish} form={form}>
          <div className="text-center form-texts">
            <h1>Welcome back :))</h1>
            <p>Log into your account here</p>
          </div>
          <Form.Item
            name="email"
            {...(error.email
              ? {
                  validateStatus: "error",
                  help: error.email,
                }
              : null)}
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input size="large" placeholder="Цахим хаяг эсвэл оюутны код" />
          </Form.Item>
          <Form.Item
            name="password"
            {...(error.password
              ? {
                  validateStatus: "error",
                  help: error.password,
                }
              : null)}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password size="large" placeholder="Нууц үг" />
          </Form.Item>
          <Form.Item>
            <div className="text-right">
              <Link to="/auth/forgot">Нууц үгээ мартсан?</Link>
            </div>
          </Form.Item>
          <Form.Item>
            <p className="small" style={{ color: "#a8071a" }}>
              {error.failed}
            </p>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              size="large"
              block
            >
              Нэвтрэх
            </Button>
          </Form.Item>
          <div className="form-actions">
            <p>
              Бүртгэлгүй байгаа юу?{" "}
              <Link to="/auth/register">
                <b>Бүртгүүлэх</b>
              </Link>
            </p>
          </div>
        </Form>
      )}
    </div>
  );
};
export default Auth;
