import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardBookmarks from "./pages/DashboardBookmarks";
import DashboardProfile from "./pages/DashboardProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import DashboardLayout from "./components/DashboardLayout";

// A layout wrapper for public pages that includes the header and footer
function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// A simple layout for auth pages like Login
function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/articles" element={<PublicLayout><Articles /></PublicLayout>} />
        <Route path="/articles/:id" element={<PublicLayout><ArticleDetail /></PublicLayout>} />
        <Route path="/blogs" element={<PublicLayout><Blogs /></PublicLayout>} />
        <Route path="/blogs/:id" element={<PublicLayout><BlogDetail /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        
        {/* Legal Routes */}
        <Route path="/privacy" element={<PublicLayout><Legal defaultTab="privacy" /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><Legal defaultTab="terms" /></PublicLayout>} />
        <Route path="/cookies" element={<PublicLayout><Legal defaultTab="cookies" /></PublicLayout>} />

        {/* Authentication Routes */}
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        
        {/* Dashboard Routes with DashboardLayout */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/dashboard/bookmarks" element={<DashboardLayout><DashboardBookmarks /></DashboardLayout>} />
        <Route path="/dashboard/profile" element={<DashboardLayout><DashboardProfile /></DashboardLayout>} />
        
      </Routes>
    </Router>
  );
}
