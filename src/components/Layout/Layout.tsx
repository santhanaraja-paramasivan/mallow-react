import { ReactNode } from "react";
import { Layout as AntdLayout } from "antd";
import { Header } from "../Header";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
const { Content } = AntdLayout;

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.application);

  return (
    <>
      {isAuthenticated ? (
        <AntdLayout className="h-screen">
          <Header />
          <Content className="flex flex-col h-full overflow-hidden">
            <div className="flex-grow overflow-auto">
              <div className="p-2">{children}</div>
            </div>
          </Content>
        </AntdLayout>
      ) : (
        <AntdLayout className="h-screen">{children}</AntdLayout>
      )}
    </>
  );
};

export default Layout;
