import { Col, Layout, Typography } from "antd";
import UserPopover from "./UserPopover";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import { useMemo } from "react";
import { useLogoutMutation } from "@/service/query/endpoints/LoginApi";
import { updateUserInfo } from "@/slice/appSlice";

const { Header: AntdHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  const { user } = useAppSelector((state: RootState) => state.application);
  const dispatch = useAppDispatch();
  const avatarName = useMemo(() => {
    if (user) {
      const emailNamePart = user?.split("@")[0];
      if (emailNamePart.includes(".")) {
        return emailNamePart.split(".").join(" ").toUpperCase();
      }
      return emailNamePart[0].toUpperCase();
    }
  }, [user]);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({});
      dispatch(updateUserInfo(null))
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AntdHeader className="header-main px-4 py-2 shadow flex justify-end items-center gap-8">
      <Col>
        <Title level={4}>{avatarName}</Title>
      </Col>
      <UserPopover user={user} avatarName={avatarName} onLogout={handleLogout} />
    </AntdHeader>
  );
};

export default Header;
