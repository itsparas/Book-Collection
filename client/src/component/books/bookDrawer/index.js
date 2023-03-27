import React, { useState } from "react";
import { Drawer, Button, Input, Form } from "antd";

const BookDrawerComponent = ({
  visible,
  onClose,
  onSubmit,
  setReload,
  values,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      onSubmit(values)
        .then(() => {
          setLoading(false);
          form.resetFields();
          onClose();
          setReload(true);
        })
        .catch(() => {
          setLoading(false);
        });
    });
  };

  return (
    <Drawer
      open={visible}
      destroyOnClose={true}
      onClose={onClose}
      title="Add Book"
      width={400}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="primary" loading={loading}>
            Submit
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" initialValues={values}>
        <Form.Item
          name="bookName"
          label="Book Name"
          rules={[{ required: true, message: "Please enter book name" }]}
        >
          <Input placeholder="Enter book name" />
        </Form.Item>
        <Form.Item
          name="bookDescription"
          label="Book Description"
          rules={[{ required: true, message: "Please enter book description" }]}
        >
          <Input.TextArea placeholder="Enter book description" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter book price" }]}
        >
          <Input type="number" placeholder="Enter book price" />
        </Form.Item>
        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: "Please enter book author" }]}
        >
          <Input placeholder="Enter book author" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default BookDrawerComponent;
