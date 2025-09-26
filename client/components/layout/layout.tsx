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
import { Home, Cuboid, Pickaxe, Tractor, Trophy, Users } from "lucide-react";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const sidebarItems = [
    {
      label: "Home",
      path: "/",
      icon: <Home />,
      tooltip: "Home",
    },
    {
      label: "Play",
      items: [
        {
          label: "Mining",
          path: "/mining",
          icon: <Pickaxe />,
          tooltip: "Mining",
        },
        {
          label: "Climbing",
          path: "/climbing",
          icon: <Cuboid />,
          tooltip: "Climbing",
        },
      ],
    },
    {
      label: "Utility",
      items: [
        {
          label: "Staking",
          path: "/staking",
          icon: <Tractor />,
          tooltip: "Staking",
        },
        {
          label: "Leaderboard",
          path: "/leaderboard",
          icon: <Trophy />,
          tooltip: "Leaderboard",
        },
        {
          label: "Referrals",
          path: "/referral",
          icon: <Users />,
          tooltip: "Referrals",
        },
      ],
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="bg-sidebar">
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          {sidebarItems.map((group, index) => (
            <SidebarGroup key={index}>
              {group.items ? (
                <>
                  <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                  <SidebarMenu>
                    {group.items.map((item, subIndex) => (
                      <SidebarMenuItem key={subIndex}>
                        <Link to={item.path} className="contents">
                          <SidebarMenuButton
                            isActive={isActive(item.path)}
                            tooltip={item.tooltip}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </>
              ) : (
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link to={group.path} className="contents">
                      <SidebarMenuButton
                        isActive={isActive(group.path)}
                        tooltip={group.tooltip}
                      >
                        {group.icon}
                        <span>{group.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              )}
            </SidebarGroup>
          ))}
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
