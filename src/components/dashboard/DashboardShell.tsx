"use client";

import { useState } from "react";
import { DashboardSidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Footer } from "./Footer";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* سایدبار دسکتاپ */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <DashboardSidebar />
      </aside>

      {/* سایدبار موبایل */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute inset-y-0 right-0 w-64 shadow-2xl">
            <DashboardSidebar onNavigate={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* محتوای اصلی */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
         <Footer />
      </div>
    </div>
  );
}