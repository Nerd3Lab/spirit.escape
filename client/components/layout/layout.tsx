import LayoutHeader from "./layout-header";
import LayoutFooter from "@/components/layout/layout-footer";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarInset,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Gamepad2,
  Trophy,
  Users,
  ShieldCheck,
} from "lucide-react";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="bg-sidebar">
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/" className="contents">
                  <SidebarMenuButton isActive={isActive("/")} tooltip="Home">
                    <LayoutDashboard />
                    <span>Home</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/play" className="contents">
                  <SidebarMenuButton
                    isActive={isActive("/play")}
                    tooltip="Play"
                  >
                    <Gamepad2 />
                    <span>Play</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/staking" className="contents">
                  <SidebarMenuButton
                    isActive={isActive("/staking")}
                    tooltip="Staking"
                  >
                    <ShieldCheck />
                    <span>Staking</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/leaderboard" className="contents">
                  <SidebarMenuButton
                    isActive={isActive("/leaderboard")}
                    tooltip="Leaderboard"
                  >
                    <Trophy />
                    <span>Leaderboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/referral" className="contents">
                  <SidebarMenuButton
                    isActive={isActive("/referral")}
                    tooltip="Referrals"
                  >
                    <Users />
                    <span>Referrals</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        {/* Rail to click-collapse on desktop */}
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <div className="flex min-h-svh flex-col">
          <LayoutHeader />
          <div className="flex-1">{children}</div>
          <LayoutFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
