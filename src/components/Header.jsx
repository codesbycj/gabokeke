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
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 border-b border-gray-400 shadow-sm text-white" role="banner">
      <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
        <a href="#home" className="flex items-center gap-3 sm:gap-6 cursor-pointer border border-gray-500 px-3 sm:px-5 py-2 sm:py-3 rounded-xl" aria-label="Gabokeke Emmanuel - Available for work">
          <span className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full animate-ping" aria-hidden="true"></span>
          <span className="font-bold text-xs sm:text-sm whitespace-nowrap">Gabokeke is Available</span>
        </a>

        <button
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>

        <nav className="hidden lg:flex items-center gap-10 border py-3 px-6 rounded-xl border-gray-500" aria-label="Main navigation">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                className="flex items-center justify-center gap-3 text-md font-medium"
              >
                <Icon size={20} aria-hidden="true" />
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="gap-5 hidden lg:flex" aria-label="Social links">
          <a href="https://www.linkedin.com/in/emmanuel-gabokeke" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
            <Linkedin className="p-2 bg-gray-800 w-10 h-10 rounded-xl text-gray-400 hover:text-white transition-colors" aria-hidden="true" />
          </a>
          <a href="https://x.com/codesbycj" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X profile">
            <Twitter className="p-2 bg-gray-800 w-10 h-10 rounded-xl text-gray-400 hover:text-white transition-colors" aria-hidden="true" />
          </a>
          <a href="https://github.com/codesbycj" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            <Github className="p-2 bg-gray-800 w-10 h-10 rounded-xl text-gray-400 hover:text-white transition-colors" aria-hidden="true" />
          </a>
        </div>
      </div>

      {isOpen && (
        <nav id="mobile-menu" className="lg:hidden bg-black border-t border-gray-800 py-6 absolute left-0 right-0 top-full" aria-label="Mobile navigation">
          <div className="container mx-auto flex flex-col px-6 space-y-2">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} aria-hidden="true" />
                  {link.label}
                </a>
              );
            })}
          </div>
          <div className="w-full flex items-center justify-center mt-8">
            <div className="flex justify-center gap-6">
              <a href="https://www.linkedin.com/in/emmanuel-gabokeke" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                <Linkedin className="p-2 bg-gray-800 w-9 h-9 rounded-lg text-gray-400 hover:text-white transition-colors" aria-hidden="true" />
              </a>
              <a href="https://x.com/codesbycj" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X profile">
                <Twitter className="p-2 bg-gray-800 w-9 h-9 rounded-lg text-gray-400 hover:text-white transition-colors" aria-hidden="true" />
              </a>
              <a href="https://github.com/codesbycj" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                <Github className="p-2 bg-gray-800 w-9 h-9 rounded-lg text-gray-400 hover:text-white transition-colors" aria-hidden="true" />
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
