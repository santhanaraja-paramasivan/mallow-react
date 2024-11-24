/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table } from "antd";
import { DataType, getColumnsConstant } from "@/constants/columnConstant";
import { useAppDispatch } from "@/hooks/redux";
import { updateModalOpen, updateSelectedUser } from "@/slice/appSlice";

interface DataTableProps {
  userList: DataType[];
  totalUsers: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
}

const DataTableComponent: React.FC<DataTableProps> = ({
  userList,
  totalUsers,
  currentPage,
  onPageChange,
  onDelete
}) => {
  const dispatch = useAppDispatch();
  const handleEditUser = (user: any) => {
    dispatch(updateModalOpen(true));
    dispatch(updateSelectedUser(user));
  };
  const handleDeleteUser = (user: any) => {
    onDelete(user.id)
  };
  return (
    <Table<DataType>
      columns={getColumnsConstant({
        onEdit: handleEditUser,
        onDelete: handleDeleteUser,
      })}
      dataSource={userList}
      pagination={{
        current: currentPage,
        total: totalUsers,
        pageSize: 4,
        onChange: onPageChange,
      }}
      rowKey="id"
    />
  );
};

export default DataTableComponent;