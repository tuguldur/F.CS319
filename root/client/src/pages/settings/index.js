import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
// import { Row, Col } from "antd";
import {
  Spin,
  Table,
  Badge,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  notification,
  Space,
  Popconfirm,
} from "antd";
import axios from "axios";
import "./style.scss";
/*
  Нэр солих 
  нүүц үг солих 
  шинэ админ бүртгэх, устгах
*/
import { User } from "context/user";
const Settings = () => {
  const { Option } = Select;
  const { user } = useContext(User);
  const [admins, setAdmins] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [edit, showEdit] = useState(false);
  const [newstaff, showNewStaff] = useState(false);
  // form
  const [staff] = Form.useForm();
  const [editform] = Form.useForm();
  const get_admin = () => {
    setAdmins(null);
    axios
      .get("api/root")
      .then((response) => setAdmins([{ ...user }].concat(response.data)));
  };
  useEffect(() => {
    if (user && user.type === "root") {
      get_admin();
    }
  }, [user]);
  useEffect(() => {
    if (admin) editform.resetFields();
  }, [admin]);
  const columns = [
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span>
          {text} {record._id === user._id ? "(та)" : null}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: "Төрөл",
      dataIndex: "type",
      key: "type",
      render: (text, record) => <Badge count={text} className="admin-type" />,
    },
    {
      title: "Үүсгэсэн",
      dataIndex: "created",
      key: "created",
      render: (text, record) => <span>{moment(text).fromNow()}</span>,
    },
    {
      title: "",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => {
              showEdit(true);
              if (admin) {
                setAdmin(null);
              }
              setAdmin(record);
            }}
          >
            Засах
          </Button>
          {record._id !== user._id ? (
            <Popconfirm
              title={`${record.name}-ийн бүртгэлийг устгахдаа итгэлтэй байна уу?`}
              onConfirm={() => {
                axios.get("/api/root/delete/" + record._id);
                message.success("Бүртгэлээс амжилттай хаслаа.");
                get_admin();
              }}
              okText="Тийм"
              cancelText="Үгүй"
            >
              <Button size="small" danger>
                Устгах
              </Button>
            </Popconfirm>
          ) : null}
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="settings">
        <div className="add-new-wrapper">
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => showNewStaff(true)}
          >
            Ажилтан нэмэх
          </Button>
        </div>
        {admins ? (
          <Table
            columns={columns}
            dataSource={admins}
            rowKey={(record) => record._id}
          />
        ) : (
          <div className="spinner-container">
            <Spin />
          </div>
        )}
      </div>
      {/* edit modal */}
      <Modal
        title="Мэдээлэл засах"
        visible={edit}
        onOk={() => editform.submit()}
        onCancel={() => showEdit(false)}
        okText="Хадгалах"
        cancelText="Цуцлах"
      >
        {admin ? (
          <Form
            name="edit-form"
            onFinish={(values) => {
              axios.post("/api/root/update", { ...values }).then((response) => {
                const { status, errors } = response.data;
                if (status) {
                  message.success("Мэдээлэл амжилттай солигдлоо.");
                  get_admin();
                  editform.resetFields();
                } else {
                  notification.error({
                    message: "Алдаатай хүсэлт.",
                    description: errors.map((err, index) => (
                      <div key={index}>
                        <span>
                          - <b>{err.param}</b> {err.msg}
                        </span>
                        <br />
                      </div>
                    )),
                  });
                }
              });
            }}
            initialValues={{ ...admin }}
            form={editform}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Ажилтны нэрийг оруулна уу.",
                },
              ]}
            >
              <Input placeholder="Нэр" autoComplete="off" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Ажилтны email хаягыг оруулна уу.",
                },
              ]}
            >
              <Input placeholder="Email" autoComplete="off" />
            </Form.Item>
            {admin._id === user._id ? (
              <div className="change-password">
                your changing your password for yourself
              </div>
            ) : (
              <>
                <Form.Item
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: "Ажилтны төрөлийг сонгоно уу.",
                    },
                  ]}
                >
                  <Select placeholder="Ажилтны төрөл">
                    <Option value="admin">Admin</Option>
                    <Option value="student">Оюутны Менежер</Option>
                    <Option value="diploma">Дипломын Менежер</Option>
                    <Option value="department">Салбар сургуулын Менежер</Option>
                  </Select>
                </Form.Item>
              </>
            )}
          </Form>
        ) : (
          <div className="spinner-container">
            <Spin />
          </div>
        )}
      </Modal>
      {/* add new staff modal */}
      <Modal
        title="Шинэ ажилтан нэмэх"
        visible={newstaff}
        onOk={() => staff.submit()}
        onCancel={() => showNewStaff(false)}
        okText="Хадгалах"
        cancelText="Цуцлах"
      >
        <Form
          name="staff-form"
          onFinish={(values) => {
            axios.post("/api/root/create", { ...values }).then((response) => {
              const { status, errors } = response.data;
              if (status) {
                message.success("Ажилтан амжилттай нэмэгдлээ.");
                get_admin();
                staff.resetFields();
              } else {
                notification.error({
                  message: "Бүртгэл амжилтгүй боллоо.",
                  description: errors.map((err, index) => (
                    <div key={index}>
                      <span>
                        - <b>{err.param}</b> {err.msg}
                      </span>
                      <br />
                    </div>
                  )),
                });
              }
            });
          }}
          form={staff}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Ажилтны нэрийг оруулна уу.",
              },
            ]}
          >
            <Input placeholder="Нэр" autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Ажилтны email хаягыг оруулна уу.",
              },
            ]}
          >
            <Input placeholder="Email" autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="type"
            rules={[
              {
                required: true,
                message: "Ажилтны төрөлийг сонгоно уу.",
              },
            ]}
          >
            <Select placeholder="Ажилтны төрөл">
              <Option value="admin">Admin</Option>
              <Option value="student">Оюутны Менежер</Option>
              <Option value="diploma">Дипломын Менежер</Option>
              <Option value="department">Салбар сургуулын Менежер</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Ажилтны нууц үгийг оруулна уу.",
              },
            ]}
          >
            <Input.Password placeholder="Нууц үг" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Settings;
