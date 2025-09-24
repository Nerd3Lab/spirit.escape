import { useOutlet } from "react-router-dom";
import LayoutHeader from "./layout-header";
import LayoutFooter from "@/components/layout/layout-footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <LayoutHeader />
      <div className="">{children}</div>
      <LayoutFooter />
    </div>
  );
}

export default Layout;
