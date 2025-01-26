import {
  Calendar,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "@/app/logo";

import SidebarFooterContent from "./Footer";

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },

  {
    title: "Task Manager",
    url: "/task-manager",
    icon: Calendar,
  },
];

// Sidebar Header Component
function SidebarHeaderContent() {
  return (
    <SidebarHeader>
      <SidebarMenuButton className="h-auto" asChild isActive>
        <a href="#">
          <Logo className="h-20 w-20 text-gray-900 dark:text-purple" />{" "}
          <div className="flex flex-col">
            <span className="text-sm text-gray-800 dark:text-gray-200">
              Task Manager
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              by Beyonder{" "}
            </span>
          </div>
        </a>
      </SidebarMenuButton>
    </SidebarHeader>
  );
}

// Sidebar Menu Component
function SidebarMenuContent() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}


// Main AppSidebar Component
export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeaderContent />
      <SidebarContent>
        <SidebarMenuContent />
      </SidebarContent>
      <SidebarFooterContent />
    </Sidebar>
  );
}
