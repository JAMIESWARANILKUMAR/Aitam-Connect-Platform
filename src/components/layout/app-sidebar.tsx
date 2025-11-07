
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  MessageSquareQuote,
  LayoutTemplate,
  FileText,
  Users,
  LifeBuoy,
  LogOut,
  ChevronRight
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/dashboard/qna", icon: MessageSquareQuote, label: "Q&A Forum" },
    { href: "/dashboard/resume-builder", icon: FileText, label: "Resume Builder" },
    { href: "/dashboard/alumni", icon: Users, label: "Alumni Network" },
  ];

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="group-data-[variant=sidebar]:border-r"
    >
      <SidebarHeader className="h-16 flex items-center justify-center p-2 group-data-[collapsible=icon]:justify-center">
        <div className="flex items-center gap-2">
          <Image
            src="https://cdn.jumpshare.com/images/AtpYWE8GBPEVfWnMRei1.png"
            alt="AITAM Connect Logo"
            width={40}
            height={40}
            className="group-data-[collapsible=icon]:hidden"
          />
          <span className="font-bold text-lg text-sidebar-foreground group-data-[collapsible=icon]:hidden">AITAM Connect</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip={{ children: 'Help' }}>
                    <LifeBuoy />
                    <span>Help</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: 'Logout' }}>
                    <Link href="/login">
                        <LogOut />
                        <span>Logout</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
