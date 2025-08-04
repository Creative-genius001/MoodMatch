'use client'

import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background-dark ml-[16rem] p-8">
        <Sidebar />
        {children}
    </div>
  );
}
