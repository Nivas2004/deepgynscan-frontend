import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const linkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-semibold transition ${
      isActive ? "bg-yellow-400 text-blue-900" : "text-white hover:bg-blue-800"
    }`;

  return (
    <header className="w-full bg-blue-900 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Project Name */}
        <h1 className="text-2xl font-bold text-white">DeepGynScan</h1>

        {/* Navigation Links */}
        <nav className="space-x-2">
          <NavLink to="/" className={linkClasses}>
            Home
          </NavLink>
          <NavLink to="/upload" className={linkClasses}>
            Upload
          </NavLink>
          <NavLink to="/about" className={linkClasses}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClasses}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
