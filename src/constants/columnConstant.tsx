// src/constants/columnConstant.ts
import { Space, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

export interface DataType {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface ColumnsProps {
  onEdit: (record: DataType) => void;
  onDelete: (record: DataType) => void;
}

export const getColumnsConstant = ({ onEdit, onDelete }: ColumnsProps): TableProps<DataType>["columns"] => [
  {
    title: "",
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar) => (
      <div style={{ paddingLeft: "16px" }}>
        <img
          src={avatar}
          alt="Profile"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Tooltip title="Edit">
          <EditOutlined
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => onEdit(record)} // Trigger the onEdit handler
          />
        </Tooltip>
        <Tooltip title="Delete">
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(record)} // Trigger the onDelete handler
          />
        </Tooltip>
      </Space>
    ),
  },
];

export default getColumnsConstant;
