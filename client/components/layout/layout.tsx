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
  Bomb,
  Home,
  Building,
  Cuboid,
  Pickaxe,
  Tractor,
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
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/" className="contents">
                  <SidebarMenuButton isActive={isActive("/")} tooltip="Home">
                    <Home />
                    <span>Home</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>

            <SidebarGroupLabel>Play</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/mining" className="contents">
                  <SidebarMenuButton
                    isActive={isActive("/mining")}
                    tooltip="Mining"
                  >
                    <Pickaxe />
                    <span>Mining</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link to="/climbing" className="contents">
                  <SidebarMenuButton
                    isActive={isActive("/climbing")}
                    tooltip="Climbing"
                  >
                    <Cuboid />
                    <span>Climbing</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>

            <SidebarGroupLabel>Utility</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/staking" className="contents">
                  <SidebarMenuButton
                    isActive={isActive("/staking")}
                    tooltip="Staking"
                  >
                    <Tractor />
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
