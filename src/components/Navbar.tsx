import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
      <Link 
        href="#hero" 
        className="pointer-events-auto text-lg font-serif font-black tracking-tight text-foreground hover:opacity-75 transition-opacity rounded-full bg-[#F4F4F2]/80 backdrop-blur-md px-2.5 py-1 border border-border"
        aria-label="Rudraksh Sharma home"
      >
        RS<span className="text-muted-foreground">.</span>
      </Link>
      
      <nav className="pointer-events-auto flex items-center gap-1 px-3 py-1 rounded-full bg-card/90 backdrop-blur-md border border-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 max-w-[calc(100vw-90px)] overflow-x-auto scrollbar-none">
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
    </header>
  );
}
