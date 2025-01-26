"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { getSession } from "@/app/actions/authActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ChevronsUpDown,
    Key,
    LogOut,
    Pen,
    User,
  } from "lucide-react";
import { SidebarFooter, SidebarMenuButton } from "@/components/ui/sidebar";
import useSession from "@/hooks/useSession";
export default function SidebarFooterContent() {
  const {sessionData:session ,isAuthenticated } = useSession();
  const sessionLinks = [
    { url: "/posts/create", label: "Create Post", icon: Pen },
    { url: "/profile", label: "Profile", icon: User },
    { url: "/forgot-password", label: "Forget Password", icon: Key },
  ];
  const logoutLink = {
    url: "/api/auth/signout",
    label: "Logout",
    icon: LogOut,
  };
  if (session?._id) {
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
                  <AvatarImage
                    className="object-cover bg-transparent"
                    src={session?.profilePictureUrl}
                    alt={session?.name}
                  />
                  <AvatarFallback className="dark:text-white text-gray-900  dark:bg-gray-900 bg-gray-400">
                    {session?.name?.slice(0, 1)}
                  </AvatarFallback>
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
              <DropdownMenuItem onClick={() => window.location.href = logoutLink.url} className="text-red-500">
                <logoutLink.icon className="mr-2 h-4 w-4" />
                {logoutLink.label}
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    );
  }
}
