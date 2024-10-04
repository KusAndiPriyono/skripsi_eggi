"use client";

import Sidebar from "@/components/dashboard-user/sidebar";
import React, { ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import DashboardHeader from "@/components/dashboard-user/layout/header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-full w-full text-xl">
      <div
        className={`transition-width duration-300 ease-in-out h-screen ${
          isCollapsed ? "w-16" : "w-96"
        } p-6 sticky top-0 bg-[#9CC2E5]`}
      >
        {isCollapsed ? <div></div> : <Sidebar />}
        <button
          onClick={toggleSidebar}
          className={`absolute top-4  ${isCollapsed ? "right-6" : "right-4"}`}
        >
          <Menu size={24} />
        </button>
      </div>
      <div className="flex-1 bg-[#A9D6FF]">
        <div className="h-full w-full flex flex-col">
          <div className="p-4">
            <DashboardHeader />
          </div>
          {children}
        <p className="text-xl py-6 text-center w-full">Copyright  © 2024 - YEPJ SIPLah Inventory Asset</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
