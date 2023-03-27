import React, { useState, useContext } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { AuthContext } from "../../../context/Auth";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState("");

  const [user, setUser] = useState({});

  const { login } = useContext(AuthContext);

  const loginUser = async () => {
    const { email, password } = user;
    if (email.includes("@") && password.length >= 6) {
      const message = await login(user);
      setAlert(message.message);
      setTimeout(() => {
        setAlert("");
        if (message.role === "user") {
          navigate("/user/home");
        } else if (message.role === "admin") {
          navigate("/admin/home");
        } else {
          console.log(message.message);
        }
      }, 1000);
    } else {
      setAlert("please fill all the filed properly");
      setTimeout(() => setAlert(""), 1000);
    }
  };

  console.log(user);

  return (
    <div className={styles.mainContainer}>
      {alert && <div className={styles.alert}>{alert}</div>}
      <Form className={styles.register}>
        <h1>Login</h1>

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

        <Button className={styles.button} size="large" onClick={loginUser}>
          Login
        </Button>
        <div>or</div>
        <Button
          className={styles.button}
          size="large"
          onClick={() => navigate("/")}
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Login;
