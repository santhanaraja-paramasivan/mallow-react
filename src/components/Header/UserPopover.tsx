/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo } from "react";
import { Avatar, Button, Popover, Space, Typography } from "antd";
import { LoginOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface UserPopoverProps {
  user: string;
  avatarName: string;
  onLogout: () => void;
}

const UserPopover: React.FC<UserPopoverProps> = ({
  user,
  onLogout,
  avatarName,
}) => {
  const avatarLogo = useMemo(() => {
    if (avatarName) {
      return avatarName
        .split(" ")
        .map((name: string) => name[0]?.toUpperCase())
        .join("");
    }
    return "";
  }, [avatarName]);

  const popoverContent = (
    <Space direction="vertical" size="small" style={{ minWidth: 200 }}>
      <Space
        align="center"
        className="w-full"
        style={{ borderBottom: "1px solid blue", paddingBottom: 8 }}
      >
        <Avatar className="bg-blue-100 text-blue-400 border border-blue-400">
          {avatarLogo}
        </Avatar>
        <Space direction="vertical" size={0}>
          <Text strong>{avatarName}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {user}
          </Text>
        </Space>
      </Space>
      <Button type="link" onClick={onLogout} icon={<LoginOutlined />} block>
        Logout
      </Button>
    </Space>
  );

  return (
    <Popover content={popoverContent} trigger="click">
      <Avatar className="bg-blue-100 text-blue-400 border border-blue-400 cursor-pointer">
        {avatarLogo}
      </Avatar>
    </Popover>
  );
};

export default UserPopover;
