import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Bell, Monitor, Lock, User, CheckCircle2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function DashboardSettings() {
  const userEmail = localStorage.getItem("orbit_auth_email") || "reader@orbit.news";
  const username = localStorage.getItem("orbit_profile_username") || userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1);

  const [activeTab, setActiveTab] = useState("personal");

  const navItems = [
    { id: "personal", label: "Personal Information", icon: User },
    { id: "password", label: "Change Password", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Bell },
    { id: "accounts", label: "Connected Accounts", icon: Shield },
    { id: "devices", label: "Devices", icon: Monitor },
  ];

  // Helper for rendering inputs
  const ModernInput = ({ label, type = "text", defaultValue, placeholder }) => (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-muted-foreground tracking-wider uppercase">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full p-4 bg-muted/30 border border-rule/50 rounded-xl focus:border-accent-red focus:bg-background outline-none text-[15px] text-foreground transition-all placeholder:text-muted-foreground/40 font-medium"
      />
    </div>
  );

  return (
    <motion.div
      className="fade-in max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

      {/* Left Sidebar Settings Navigation */}
      <motion.div variants={itemVariants} className="w-full lg:w-72 shrink-0 sticky top-8">
        <h1 className="font-serif text-4xl font-bold mb-8 text-foreground tracking-tight">Settings</h1>
        <nav className="flex flex-col gap-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-[15px] font-bold transition-all ${isActive
                  ? "bg-accent-red text-white shadow-md shadow-accent-red/20 scale-[1.02]"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </motion.div>

      {/* Main Settings Content Area */}
      <motion.div variants={itemVariants} className="flex-1 w-full min-w-0 flex flex-col gap-10">

        {/* Personal Information Section */}
        <div className="bg-background border border-rule/40 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-rule/40 bg-muted/10">
            <h2 className="font-serif text-2xl font-bold text-foreground">Personal Information</h2>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-6 mb-10 pb-8 border-b border-rule/40">
              <div className="w-20 h-20 rounded-full bg-accent-red text-white flex items-center justify-center text-3xl font-bold shadow-md">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">Profile Picture</span>
                <button className="px-5 py-2.5 bg-background border-2 border-rule/60 hover:border-foreground/30 rounded-xl text-sm font-bold transition-all shadow-sm">
                  Change Avatar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ModernInput label="Full Name" defaultValue={username} />
              <ModernInput label="Email Address" type="email" defaultValue={userEmail} />
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-background border border-rule/40 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-rule/40 bg-muted/10">
            <h2 className="font-serif text-2xl font-bold text-foreground">Change Password</h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ModernInput label="Old Password" type="password" placeholder="••••••••" />
              <ModernInput label="New Password" type="password" placeholder="••••••••" />
              <ModernInput label="Confirm Password" type="password" placeholder="••••••••" />
            </div>
            <div className="mt-8 flex justify-end">
              <button className="px-8 py-3 bg-foreground text-background hover:bg-accent-red hover:text-white rounded-xl text-sm font-bold transition-all shadow-md">
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-background border border-rule/40 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-rule/40 bg-muted/10">
            <h2 className="font-serif text-2xl font-bold text-foreground">Preferences</h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Theme</label>
                <select className="w-full p-4 bg-muted/30 border border-rule/50 rounded-xl focus:border-accent-red outline-none text-[15px] font-medium appearance-none cursor-pointer">
                  <option>Light Mode</option>
                  <option>Dark Mode</option>
                  <option>System Default</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Language</label>
                <select className="w-full p-4 bg-muted/30 border border-rule/50 rounded-xl focus:border-accent-red outline-none text-[15px] font-medium appearance-none cursor-pointer">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Timezone</label>
                <select className="w-full p-4 bg-muted/30 border border-rule/50 rounded-xl focus:border-accent-red outline-none text-[15px] font-medium appearance-none cursor-pointer">
                  <option>Select timezone</option>
                  <option>UTC -05:00 (EST)</option>
                  <option>UTC -08:00 (PST)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Two Cards: Accounts and Devices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Connected Accounts */}
          <div className="bg-background border border-rule/40 rounded-3xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-rule/40 bg-muted/10">
              <h2 className="font-serif text-xl font-bold text-foreground">Connected Accounts</h2>
            </div>
            <div className="p-8 flex flex-col gap-6 flex-1">
              {/* Google */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-rule/40 bg-muted/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-[15px]">Google</div>
                    <div className="text-xs text-muted-foreground mt-1">Connected as {userEmail}</div>
                  </div>
                </div>
                <button className="px-4 py-2 border-2 border-rule/60 hover:border-accent-red hover:text-accent-red rounded-xl text-[13px] font-bold transition-colors">
                  Disconnect
                </button>
              </div>

              {/* GitHub */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-rule/40 bg-muted/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-foreground text-background rounded-full shadow-sm flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-[15px]">GitHub</div>
                    <div className="text-xs text-muted-foreground mt-1">Connected as dev_orbit</div>
                  </div>
                </div>
                <button className="px-4 py-2 border-2 border-rule/60 hover:border-accent-red hover:text-accent-red rounded-xl text-[13px] font-bold transition-colors">
                  Disconnect
                </button>
              </div>
            </div>
          </div>

          {/* Devices */}
          <div className="bg-background border border-rule/40 rounded-3xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-rule/40 bg-muted/10">
              <h2 className="font-serif text-xl font-bold text-foreground">Devices</h2>
            </div>
            <div className="p-8 flex flex-col gap-6 flex-1">

              <div className="flex items-center justify-between p-4 rounded-2xl border border-rule/40 bg-muted/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-background border border-rule shadow-sm rounded-xl flex items-center justify-center shrink-0">
                    <Monitor className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <div className="font-bold text-[15px] flex items-center gap-2">
                      MacBook Pro 16"
                      <span className="text-[10px] bg-accent-red/10 text-accent-red px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Houston, TX • Chrome 116</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-rule/40 hover:bg-muted/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-background border border-rule shadow-sm rounded-xl flex items-center justify-center shrink-0 opacity-70">
                    <div className="w-4 h-6 border-[2px] border-foreground rounded-[4px]"></div>
                  </div>
                  <div>
                    <div className="font-bold text-[15px]">iPhone 14 Pro</div>
                    <div className="text-xs text-muted-foreground mt-1">Last used 2 days ago</div>
                  </div>
                </div>
                <button className="px-4 py-2 hover:bg-red-50 hover:text-red-600 rounded-xl text-[13px] font-bold transition-colors">
                  Remove
                </button>
              </div>

            </div>
          </div>

        </div>

      </motion.div>
    </motion.div>
  );
}
