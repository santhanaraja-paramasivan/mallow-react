import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { ReactNode } from "react";

interface TabListProps {
  selectedTab: string;
  setSelectedTab: (key: string) => void;
}
interface TableDataProps {
  icon: ReactNode;
  key: string;
  label: string;
}

const TabList: React.FC<TabListProps> = ({ selectedTab, setSelectedTab }) => {
  const handleTabChange = (key: string) => {
    setSelectedTab(key);
  };

  const tabData: TableDataProps[] = [
    {
      icon: <TableOutlined />,
      key: "1",
      label: "Table",
    },
    {
      icon: <UnorderedListOutlined />,
      key: "2",
      label: "Card",
    },
  ];

  return (
    <Tabs
      className="px-4"
      defaultActiveKey={selectedTab}
      onChange={handleTabChange}
      items={tabData}
    />
  );
};

export default TabList;
