import React, { useState, useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { User } from "context/user";
import "./style.scss";
const Register = () => {
  let history = useHistory();
  const { user } = useContext(User);
  const [form] = Form.useForm();
  const [error, setError] = useState({});
  const onFinish = (values) => {
    setError({});
    if (values.password !== values.confirm_password) {
      setError({ confirm_password: "Password does not match." });
    } else {
      axios.post("/api/auth/register", { ...values }).then((response) => {
        let errors = response.data.errors;
        if (!response.data.status) {
          errors
            ? errors.map((err) => setError({ [err.param]: err.msg }))
            : setError({ failed: response.data.msg });
        }
        if (response.data.status) {
          message.success("Welcome, " + values.name);
          history.push("/auth");
        }
      });
    }
  };
  return (
    <div className="auth">
      {user ? (
        <Redirect to="/" />
      ) : (
        <Form
          name="register"
          layout={"vertical"}
          onFinish={onFinish}
          form={form}
        >
          <div className="text-center form-texts">
            <h1>Hello Stranger!</h1>
            <p>Create a free account on codename</p>
          </div>
          <Form.Item
            label="Цахим хаяг"
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
                type: "email",
              },
            ]}
          >
            <Input type="email" size="large" />
          </Form.Item>
          <Form.Item
            label="Нэр"
            name="name"
            {...(error.name
              ? {
                  validateStatus: "error",
                  help: error.name,
                }
              : null)}
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Оюутны код"
            name="code"
            {...(error.code
              ? {
                  validateStatus: "error",
                  help: error.code,
                }
              : null)}
            rules={[
              {
                required: true,
                message: "Please input your code!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Нууц үг"
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
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item
            label="Нууц үг давтах"
            name="confirm_password"
            {...(error.confirm_password
              ? {
                  validateStatus: "error",
                  help: error.confirm_password,
                }
              : null)}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <p className="small">
            Нууц үг дор хаяж нэг том үсэг, тоо, нэг тусгай тэмдэгттэй байх
            шаардлагатай.
          </p>
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
              Бүртгүүлэх
            </Button>
          </Form.Item>
          <div className="form-actions">
            <p>
              Бүртгэлтэй байгаа юу?{" "}
              <Link to="/auth">
                <b>Нэвтрэх</b>
              </Link>
            </p>
          </div>
        </Form>
      )}
    </div>
  );
};
export default Register;
