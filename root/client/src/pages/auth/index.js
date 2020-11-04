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
        <Redirect to="/dashboard" />
      ) : (
        <Form name="auth" layout={"vertical"} onFinish={onFinish} form={form}>
          <div className="text-center form-texts">
            <h1>Тавтай морилно уу.</h1>
            <p>
              Системд бүртгэлтэй email хаяг болон нууц үгээ ашиглан нэвтрэх
              боломжтой.
            </p>
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
                message: "email хаяг аа оруулна уу.",
              },
            ]}
          >
            <Input size="large" type="email" placeholder="Email" />
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
                message: "Нууц үгээ оруулна уу.",
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
        </Form>
      )}
    </div>
  );
};
export default Auth;
