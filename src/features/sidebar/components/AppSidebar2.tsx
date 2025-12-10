'use client';

import * as React from 'react';
import {
  Bug,
  Camera,
  ChartBar,
  Database,
  File,
  FileBadge,
  FileText,
  Folder,
  HelpCircle,
  LayoutDashboard,
  List,
  Search,
  Settings,
  User,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { NavDocuments } from './nav-documents';
import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: <LayoutDashboard />,
    },
    {
      title: 'Lifecycle',
      url: '#',
      icon: <List />,
    },
    {
      title: 'Analytics',
      url: '#',
      icon: <ChartBar />,
    },
    {
      title: 'Projects',
      url: '#',
      icon: <Folder />,
    },
    {
      title: 'Team',
      url: '#',
      icon: <User />,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: <Camera />,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: <FileBadge />,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: <File />,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: <Settings />,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: <HelpCircle />,
    },
    {
      title: 'Search',
      url: '#',
      icon: <Search />,
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: <Database />,
    },
    {
      name: 'Reports',
      url: '#',
      icon: <Bug />,
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: <FileText />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <FileBadge size={16} />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
