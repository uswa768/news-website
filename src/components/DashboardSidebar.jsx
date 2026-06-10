import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Bookmark, 
  UserCircle, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

export default function DashboardSidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const location = useLocation();
  const userEmail = localStorage.getItem("orbit_auth_email") || "reader@orbit.news";
  const firstLetter = userEmail.charAt(0).toUpperCase();
  const userName = localStorage.getItem("orbit_profile_username") || "Reader";
  
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user_identity");
    localStorage.removeItem("orbit_auth_email");
    window.location.href = "/";
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Bookmarks", path: "/dashboard/bookmarks", icon: Bookmark },
    { name: "Profile", path: "/dashboard/profile", icon: UserCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`dashboard-sidebar ${isCollapsed ? "collapsed" : ""} ${mobileMenuOpen ? "mobile-open" : ""}`}>
        
        {/* Mobile Close Button */}
        <button 
          className="md:hidden absolute top-4 right-4 p-2 bg-muted/50 rounded-full text-foreground hover:bg-accent-red hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      {/* Profile Area */}
      <div className="sidebar-profile">
        <div className="sidebar-avatar">{firstLetter}</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">{userName}</div>
          <div className="sidebar-user-email">{userEmail}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`sidebar-nav-link ${isActive ? "active" : ""}`}
              title={isCollapsed ? item.name : ""}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="sidebar-nav-label">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="sidebar-footer">
        <button 
          onClick={handleSignOut}
          className="sidebar-nav-link hover:bg-transparent hover:text-accent-red p-0"
          title={isCollapsed ? "Log Out" : ""}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className="sidebar-nav-label">Log Out</span>
        </button>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full bg-background hover:bg-foreground hover:text-background transition-colors shadow-sm"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
    </>
  );
}
