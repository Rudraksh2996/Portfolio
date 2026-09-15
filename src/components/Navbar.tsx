"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
      <Link 
        href="#hero" 
        className="pointer-events-auto text-lg font-medium tracking-tight text-foreground hover:opacity-75 transition-opacity rounded-full bg-card/90 backdrop-blur-md px-2.5 py-1 border border-border shadow-sm"
        aria-label="Rudraksh Sharma home"
        onClick={() => setIsOpen(false)}
      >
        RS<span className="text-muted-foreground">.</span>
      </Link>
      
      <div className="flex items-center gap-2">
        {/* Desktop Nav */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-card/90 backdrop-blur-md border border-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300">
          <Link href="#about" className="text-xs font-medium transition-all duration-200 rounded-full px-3 py-1 whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-hover">
            About
          </Link>
          <Link href="#certifications" className="text-xs font-medium transition-all duration-200 rounded-full px-3 py-1 whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-hover">
            Certifications
          </Link>
          <Link href="#projects" className="text-xs font-medium transition-all duration-200 rounded-full px-3 py-1 whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-hover">
            Projects
          </Link>
          <Link href="#tech" className="text-xs font-medium transition-all duration-200 rounded-full px-3 py-1 whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-hover">
            Tech Stack
          </Link>
          <Link href="#contact" className="text-xs font-medium transition-all duration-200 rounded-full px-3 py-1 whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-hover">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="pointer-events-auto md:hidden p-2 rounded-full bg-card/90 backdrop-blur-md border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-hover transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          style={{ width: '40px', height: '40px' }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <ThemeToggle />
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 px-6 pointer-events-auto md:hidden">
          <nav className="flex flex-col gap-2 p-4 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-lg">
            <Link onClick={() => setIsOpen(false)} href="#about" className="text-sm font-medium py-3 px-4 rounded-xl text-foreground hover:bg-hover transition-colors">
              About
            </Link>
            <Link onClick={() => setIsOpen(false)} href="#certifications" className="text-sm font-medium py-3 px-4 rounded-xl text-foreground hover:bg-hover transition-colors">
              Certifications
            </Link>
            <Link onClick={() => setIsOpen(false)} href="#projects" className="text-sm font-medium py-3 px-4 rounded-xl text-foreground hover:bg-hover transition-colors">
              Projects
            </Link>
            <Link onClick={() => setIsOpen(false)} href="#tech" className="text-sm font-medium py-3 px-4 rounded-xl text-foreground hover:bg-hover transition-colors">
              Tech Stack
            </Link>
            <Link onClick={() => setIsOpen(false)} href="#contact" className="text-sm font-medium py-3 px-4 rounded-xl text-foreground hover:bg-hover transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
