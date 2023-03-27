import styles from "./styles.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../.././context/Auth";
import { useNavigate } from "react-router-dom";
import BookDrawerComponent from "../books/bookDrawer";
import { axiosInstance } from "../../axios";
import { getCookie } from "../../axios";

const Layout = (props) => {
  const { user, logout, isAuthenticated, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    console.log("Form values:", values);
    return axiosInstance.post("book/addbook/", values, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.navbar}>
        {isAuthenticated && (
          <>
            <div className={styles.left}>
              <div>
                <span>{user}</span>

                <span
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </span>
              </div>
            </div>
            <div className={styles.right}>
              {role === "admin" || <span onClick={showDrawer}>Add Books</span>}
              <BookDrawerComponent
                visible={visible}
                onClose={onClose}
                onSubmit={onSubmit}
                setReload={props.setReload}
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.content}>{props.children}</div>
      <div className={styles.footer}>Made By Paras Kumar</div>
    </div>
  );
};

export default Layout;
