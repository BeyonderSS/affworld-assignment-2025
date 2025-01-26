import {
  Calendar,
  ChevronsUpDown,
  GalleryVerticalEnd,
  Home,
  Inbox,
  Key,
  LogOut,
  Pen,
  Settings,
  User,
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
import { getSession } from "@/app/actions/authActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
// Sidebar Footer with User Info
async function SidebarFooterContent() {
  const session = await getSession();
  const sessionLinks = [
    {url:"/posts/create",label:"Create Post",icon:Pen},
    { url: "/profile", label: "Profile", icon: User },
    { url: "/forgot-password", label: "Forget Password", icon: Key },
  ];
  const logoutLink = { url: "/api/auth/signout", label: "Logout", icon: LogOut };
  if (session._id) {
    return (
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              isActive
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Avatar>
                  <AvatarImage className="object-cover bg-transparent"
                    src={session?.profilePictureUrl}
                    alt={session?.name}
                  />
                  <AvatarFallback className="dark:text-white text-gray-900  dark:bg-gray-900 bg-gray-400">{session?.name?.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{session?.name}</span>
                <span>{session?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {sessionLinks.map((link, index) => (
              <Link href={link.url} key={index} className="cursor-pointer">
                <DropdownMenuItem>
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.label}
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator />
            <Link href={logoutLink.url} className="cursor-pointer">
              <DropdownMenuItem className="text-red-500">
                <logoutLink.icon className="mr-2 h-4 w-4" />
                {logoutLink.label}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    );
  }
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
