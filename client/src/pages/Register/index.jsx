import React from "react";
import Layout from "../../component/layout/Layout";
import Register from "../../component/user/register/Register";
import styles from "./styles.module.css";

const index = () => {
  return (
    <>
      <Layout>
        <div className={styles.mainContainer}>
          <Register />
        </div>
      </Layout>
    </>
  );
};

export default index;
