/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Col,
  Row,
  Input,
  Button,
  Space,
  Typography,
  Spin,
  Alert,
  Pagination,
  message,
} from "antd";
import DataTableComponent from "../common/Datatable";
import TabList from "../Tabs";
import UserCard from "../common/CardComponent";
import {
  useGetUserListQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} from "@/service/query/endpoints/UserListApt";
import ModalComponent from "../common/ModalComponent";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateModalOpen, updateSelectedUser } from "@/slice/appSlice";

const { Title } = Typography;

const Homepage = () => {
  const [userInput, setUserInput] = useState("");
  const [selectedTab, setSelectedTab] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedUser, isModalOpen } = useAppSelector(
    (state: RootState) => state.application
  );
  const dispatch = useAppDispatch();

  const {
    data: userListResponse,
    isLoading,
    error,
    refetch, // Refetch method provided by RTK Query
  } = useGetUserListQuery(currentPage);
  const { data: userList = [], total = 0 } = userListResponse || {};

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      message.success("User deleted successfully");
      refetch(); // Refresh user list after delete
    } catch (err) {
      console.error("Error deleting user:", err);
      message.error("Failed to delete user");
    }
  };

  const handleCreateUser = async (values: any) => {
    try {
      await createUser({ ...values, job: "developer" }).unwrap();
      message.success("User created successfully");
      refetch();
    } catch (err) {
      console.error("Error creating user:", err);
      message.error("Failed to create user");
    }
  };

  const handleOpenModal = (user:any) => {
    dispatch(updateModalOpen(true));
    dispatch(updateSelectedUser(user));
  };

  const handleCloseModal = () => {
    dispatch(updateModalOpen(false));
    dispatch(updateSelectedUser(null));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Row justify="center" className="h-full w-full p-4">
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={24}
        className="bg-white rounded-md shadow-sm"
      >
        <Row justify="space-between" align="middle" className="p-4 pb-0">
          <Col>
            <Title level={4}>User</Title>
          </Col>
          <Col>
            <Space>
              <Input
                placeholder="Search User"
                value={userInput}
                onChange={handleInputChange}
                className="w-52"
              />
              <Button
                type="primary"
                onClick={() => handleOpenModal({})}
                loading={isCreating}
              >
                Create User
              </Button>
            </Space>
          </Col>
        </Row>
        <TabList setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      </Col>

      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        {isLoading ? (
          <Spin size="large" tip="Loading users..." />
        ) : error ? (
          <Alert
            message="Error"
            description="Failed to load users"
            type="error"
          />
        ) : selectedTab === "1" ? (
          <DataTableComponent
            userList={userList}
            totalUsers={total}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onDelete={handleDeleteUser}
          />
        ) : (
          <Row gutter={[16, 16]} className="py-4">
            {userList?.map((user: any, index: number) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <UserCard
                  name={user.first_name}
                  email={user.email}
                  avatar={user.avatar}
                  onEdit={() => handleOpenModal(user)}
                  onDelete={() => handleDeleteUser(user.id)}
                />
              </Col>
            ))}
            <Col span={24} style={{ textAlign: "center", marginTop: "16px" }}>
              <Pagination
                className="justify-end"
                current={currentPage}
                total={total}
                pageSize={4}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </Col>
          </Row>
        )}
      </Col>

      <ModalComponent
        visible={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateUser}
        initialValues={selectedUser || null}
        isEditMode={!!selectedUser?.email}
      />
    </Row>
  );
};

export default Homepage;
