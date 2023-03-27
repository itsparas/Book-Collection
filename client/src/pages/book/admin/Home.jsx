import { useContext, useState, useEffect } from "react";
import { axiosInstance } from "../../../axios";
import { AuthContext } from "../../../context/Auth";
import { useNavigate } from "react-router-dom";
import Layout from "../../../component/layout/Layout";
import BookCard from "../../../component/books/BookCard";
import { getCookie } from "../../../axios";
import { Form, Input, Modal } from "antd";
import styles from "./styles.module.css";

function AdminHome() {
  const { isAuthenticated, role } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [defaultValue, setDefaultValue] = useState({});
  const [visible, setVisible] = useState(false);

  const onSubmit = (values) => {
    console.log("Form values:", values);
    return axiosInstance.post("book/addbook/", values, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
  };

  const getbooks = async () => {
    await axiosInstance
      .get("/book/getallbooks", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setReload(false);
  };

  const onDelete = async (bookid) => {
    await axiosInstance
      .get(`/book/deletebook/${bookid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
    setReload(true);
  };

  function onEdit(book) {
    setDefaultValue(book);
    setVisible((prev) => !prev);
  }

  console.log(defaultValue);

  useEffect(() => {
    if (isAuthenticated) {
      getbooks();
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, reload]);

  const handelOk = async () => {
    setVisible((prev) => !prev);
    await axiosInstance
      .post(`/book/updatebook/${defaultValue._id}`, defaultValue, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((response) => {
        setReload(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleCancel = () => {
    setVisible((prev) => !prev);
  };

  const fromHandler = (e) => {
    setDefaultValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(defaultValue);
  return (
    <>
      <Modal
        title="Update Book"
        open={visible}
        onOk={handelOk}
        onCancel={handleCancel}
      >
        <Form className={styles.form} layout="vertical">
          <label htmlFor="bookName">Book Name</label>
          <Input
            name="bookName"
            className={styles.password}
            placeholder="Book Name"
            value={defaultValue.bookName}
            onChange={fromHandler}
          />
          <label htmlFor="bookDescription">Book Description</label>

          <Input
            name="bookDescription"
            className={styles.password}
            placeholder="Book Description"
            value={defaultValue.bookDescription}
            onChange={fromHandler}
          />

          <label htmlFor="author">Book Author</label>

          <Input
            name="author"
            className={styles.password}
            placeholder="Book Author"
            value={defaultValue.author}
            onChange={fromHandler}
          />
        </Form>
      </Modal>
      {isAuthenticated && (
        <Layout setReload={setReload}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "60%",
            }}
          >
            <h2>Book List</h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {books.map((book) => {
                return (
                  <>
                    <BookCard
                      key={book._id}
                      book={book}
                      onDelete={() => onDelete(book._id)}
                      onEdit={() => onEdit(book)}
                      role={role}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default AdminHome;
