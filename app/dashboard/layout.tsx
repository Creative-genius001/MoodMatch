'use client'

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { useIsMobile } from "./hooks/use-mobile";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className={`min-h-screen bg-background-dark ml-0 md:ml-[16rem] p-0 md:p-8`}>
        <Sidebar
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {children}
    </div>
  );
}
