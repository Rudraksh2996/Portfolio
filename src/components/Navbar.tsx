"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-3 bg-background/80 backdrop-blur-md border-b border-border pointer-events-auto">
      <Link 
        href="#hero" 
        className="text-lg font-bold tracking-tight text-foreground hover:opacity-75 transition-opacity"
        aria-label="Rudraksh Sharma home"
        onClick={() => setIsOpen(false)}
      >
        RS<span className="text-accent">.</span>
      </Link>
      
      <div className="flex items-center gap-4">
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="#certifications" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Certifications
          </Link>
          <Link href="#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="#tech" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Tech Stack
          </Link>
          <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2 border-l border-border pl-4 ml-2">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 border-b border-border bg-background px-6 py-4 md:hidden shadow-sm">
          <nav className="flex flex-col gap-4">
            <Link onClick={() => setIsOpen(false)} href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link onClick={() => setIsOpen(false)} href="#certifications" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Certifications
            </Link>
            <Link onClick={() => setIsOpen(false)} href="#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link onClick={() => setIsOpen(false)} href="#tech" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Tech Stack
            </Link>
            <Link onClick={() => setIsOpen(false)} href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
