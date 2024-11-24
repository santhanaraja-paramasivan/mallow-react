import { Card, Avatar, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface UserCardProps {
  name: string;
  email: string;
  avatar: string;
  onEdit: () => void; // Callback for editing the user
  onDelete: () => void; // Callback for deleting the user
}

const UserCard: React.FC<UserCardProps> = ({ name, email, avatar, onEdit, onDelete }) => {
  return (
    <Card className="user-card">
      <Space direction="vertical" align="center">
        <Avatar src={avatar} size={64} />
        <div>
          <strong>{name}</strong>
        </div>
        <div>{email}</div>
        <div className="hover-actions rounded-lg">
          <Space>
            {/* Call the onEdit and onDelete handlers when respective icons are clicked */}
            <EditOutlined
              className="action-icon p-2 bg-blue-400 rounded-full cursor-pointer"
              onClick={onEdit}
            />
            <DeleteOutlined
              className="action-icon p-2 bg-red-400 rounded-full cursor-pointer"
              onClick={onDelete}
            />
          </Space>
        </div>
      </Space>
    </Card>
  );
};

export default UserCard;
