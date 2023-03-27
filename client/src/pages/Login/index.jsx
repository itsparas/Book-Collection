import React from "react";
import Layout from "../../component/layout/Layout";
import Login from "../../component/user/login/Login";
import styles from "./styles.module.css";

const index = () => {
  return (
    <>
      <Layout>
        <div className={styles.mainContainer}>
          <Login />
        </div>
      </Layout>
    </>
  );
};

export default index;
