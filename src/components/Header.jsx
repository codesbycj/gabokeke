import {
  Box,
  Briefcase,
  Github,
  Home,
  Linkedin,
  Mail,
  Menu,
  Twitter,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#experience", label: "Experience", icon: Briefcase },
    { href: "#projects", label: "Projects", icon: Box },
    { href: "#contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 border-b border-gray-400
    shadow-sm text-white"
    >
      <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 sm:h-16 md:h-20">
        {/* Logo Section */}
        <div className="flex items-center gap-3 sm:gap-6 cursor-pointer border border-gray-500 px-3 sm:px-5 py-2 sm:py-3 rounded-xl">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full animate-ping"></div>
          <p className="font-bold text-xs sm:text-sm whitespace-nowrap">Gabokeke is Available</p>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-10 border py-3 px-6 rounded-xl border-gray-500">
          {navLinks.map((link, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-3"
            >
              <link.icon className="w-5 h-5" />
              <a href={link.href} className="text-md font-medium">
                {link.label}
              </a>
            </div>
          ))}
        </div>

        {/* Desktop Socials */}
        <div className="gap-5 hidden lg:flex">
          <a href="https://www.linkedin.com/in/emmanuel-gabokeke" target="_blank">
            <Linkedin className="p-2 bg-gray-800 w-10 h-10 rounded-xl text-gray-400 hover:text-white transition-colors" />
          </a>
          <a href="https://x.com/codesbycj" target="_blank">
            <Twitter className="p-2 bg-gray-800 w-10 h-10 rounded-xl text-gray-400 hover:text-white transition-colors" />
          </a>
          <a href="https://github.com/codesbycj" target="_blank">
            <Github className="p-2 bg-gray-800 w-10 h-10 rounded-xl text-gray-400 hover:text-white transition-colors" />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800 py-6 fixed inset-x-0 top-14 sm:top-16 bottom-0 overflow-y-auto">
          <div className="container mx-auto flex flex-col px-6 space-y-2">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </a>
            ))}
          </div>
          <div className="w-full flex font-bold items-center justify-center mt-8">
            <div className="flex justify-center gap-6">
              <a href="https://www.linkedin.com/in/emmanuel-gabokeke" target="_blank">
                <Linkedin className="p-2 bg-gray-800 w-12 h-12 rounded-xl text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://x.com/codesbycj" target="_blank">
                <Twitter className="p-2 bg-gray-800 w-12 h-12 rounded-xl text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://github.com/codesbycj" target="_blank">
                <Github className="p-2 bg-gray-800 w-12 h-12 rounded-xl text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
