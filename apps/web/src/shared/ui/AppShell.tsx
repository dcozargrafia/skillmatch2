import { ConfigProvider } from "antd";
import type { PropsWithChildren } from "react";

export const AppShell = ({ children }: PropsWithChildren): JSX.Element => (
  <ConfigProvider>
    <main>{children}</main>
  </ConfigProvider>
);
