import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="dashboard-layout h-screen overflow-hidden">
      {/* Mobile Top Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-6 pt-8 pb-5 border-b border-rule bg-background/95 backdrop-blur-md sticky top-0 z-40">
          <div className="font-serif font-bold text-2xl text-foreground tracking-tight">Orbit Dispatch</div>
          <button onClick={() => setMobileMenuOpen(true)} className="p-1 -mr-1 text-foreground active:scale-95 transition-transform">
            <Menu className="w-7 h-7" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <DashboardSidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main className="dashboard-main-content bg-background flex-1 w-full max-w-full overflow-x-hidden overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full p-4 md:p-8 pb-20">
          {children}
        </div>
      </main>
    </div>
  );
}
