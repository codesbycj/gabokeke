import { Box, Briefcase, Home, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const navLinks = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#experience", label: "Experience", icon: Briefcase },
    { href: "#projects", label: "Projects", icon: Box },
  ];
  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-black backdrop-blur-sm z-50 border-b border-gray-400
    shadow-sm text-white"
    >
      <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16">
        {/* Logo Section */}
        <div className="flex items-center gap-6 cursor-pointer border border-gray-500 px-5 py-3 rounded-xl">
          <div className="w-4 h-4 bg-green-600 rounded-full animate-ping"></div>
          <p className="font-bold text-sm">Gabokeke is Available</p>
        </div>

        {/* Mobile Menu */}
        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-10 border py-3 px-6 rounded-xl border-gray-500 -ms-15">
          {navLinks.map((link, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center gap-3"
              >
                {<link.icon className="w-5 h-5" />}
                <a href={link.href} className={"text-md font-medium"}>
                  {link.label}
                </a>
              </div>
            );
          })}
        </div>

        {/* Get in Touch */}
        <Link
          to="/summary"
          className="hidden lg:block bg-gray-200 text-black
         px-6 py-2.5 rounded-lg hover:bg-white text-md font-medium transition-all
         hover:shadow-sm hover:shadow-white"
        >
          Quick Summary
        </Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black border-t border-gray-100 py-4">
          <div className="container mx-auto flex flex-col px-4 space-y-4">
            {navLinks.map((link, index) => {
              return (
                <a
                  href={link.href}
                  className={`block text-md font-medium py-2`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
          <div className="w-full flex font-bold items-center justify-center mt-5">
            <Link
              to="/summary"
              className="text-black text-center w-full bg-white py-2 rounded-xl"
            >
              Quick Summary
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
