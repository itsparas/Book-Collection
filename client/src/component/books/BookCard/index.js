import React from "react";
import { Card, Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

const BookCard = ({ book, onDelete, onEdit, role }) => {
  return (
    <Card
      hoverable
      title={book.bookName}
      style={{ width: "270px" }}
      actions={[
        <Tooltip title="Edit">
          <Button type="text" icon={<EditOutlined />} onClick={onEdit} />
        </Tooltip>,
        role !== "admin" && (
          <Tooltip title="Delete">
            <Button type="text" icon={<DeleteOutlined />} onClick={onDelete} />
          </Tooltip>
        ),
      ]}
    >
      <Meta description={`$${book.price}`} />
      <div>
        <p>{book.bookDescription}</p>
        <p>Author: {book.author}</p>
      </div>
    </Card>
  );
};

export default BookCard;
