import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-rule bg-black text-white transition-colors">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        {/* Left branding */}
        <div className="col-span-2">
          <div className="serif text-2xl font-bold">ORBIT·DISPATCH</div>
          <p className="mt-3 max-w-sm text-sm opacity-70">
            Independent, ad-free reporting on the people, machines, and ideas pushing humanity beyond Earth.
          </p>
        </div>

        {/* Middle Column: Sections */}
        <div>
          <div className="tag-label opacity-60">Sections</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/articles" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column: Legal */}
        <div>
          <div className="tag-label opacity-60">Legal</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/privacy" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-4 text-xs opacity-60 md:flex-row md:items-center">
          <div>© {currentYear} Orbit Dispatch. All rights reserved.</div>
          <div>Data: Spaceflight News API</div>
        </div>
      </div>
    </footer>
  );
}
