import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Radio } from "antd";
import { axiosInstance } from "../../../axios";

const Register = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState("");

  const [user, setUser] = useState({});

  const onFinish = () => {
    axiosInstance
      .post("/user/register", user)
      .then((res) => {
        setAlert(res.data.message);
        setTimeout(() => setAlert(""), 1000);
      })
      .catch((e) => {
        setAlert(e.response.data.message);
        setTimeout(() => setAlert(""), 1000);
      });
  };

  const onFinishFailed = (errorInfo) => {
    setAlert(errorInfo.errorFields[0].errors[0]);
    setTimeout(() => setAlert(""), 1000);
  };

  console.log(user);

  return (
    <div className={styles.mainContainer}>
      {alert.length > 0 && <div className={styles.alert}>{alert}</div>}
      <Form
        className={styles.register}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h1>Register</h1>
        <Form.Item
          name="fname"
          className={styles.item}
          rules={[
            { required: true, message: "Please input your first name!" },
            { min: 3, message: "First name must be more than 3 character" },
          ]}
        >
          <Input
            name="fname"
            value={user.fname}
            placeholder="Enter Your First Name"
            className={styles.password}
            onChange={(e) => setUser({ ...user, fname: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="lname"
          className={styles.item}
          rules={[
            { required: true, message: "Please input your last name!" },
            { min: 3, message: "Last name must be more than 3 character" },
          ]}
        >
          <Input
            name="lname"
            value={user.lname}
            placeholder="Enter Your Last Name"
            className={styles.password}
            onChange={(e) => setUser({ ...user, lname: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          name="email"
          className={styles.item}
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input a valid email!" },
          ]}
        >
          <Input
            name="email"
            className={styles.password}
            placeholder="Enter Your Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="password"
          className={styles.item}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            name="password"
            className={styles.password}
            placeholder="Password (min. 6 character )"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Item>
        {/* 
        <div>
          <span>Registring As : </span>

          <Radio.Group value={user.role} name="role" onChange={fromHandler}>
            <Radio value={"admin"}>admin</Radio>
            <Radio value={"user"}>user</Radio>
          </Radio.Group>
        </div> */}

        <Form.Item
          label="Registring As"
          name="role"
          className={styles.item}
          style={{ display: "flex", justifyContent: "center" }}
          rules={[{ required: true, message: "Please input your role!" }]}
        >
          <Radio.Group
            name="role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <Radio value="user">User</Radio>
            <Radio value="admin">Admin</Radio>
          </Radio.Group>
        </Form.Item>

        <Button className={styles.button} size="large" htmlType="submit">
          Register
        </Button>

        <div>or</div>
        <Button
          className={styles.button}
          size="large"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Register;
