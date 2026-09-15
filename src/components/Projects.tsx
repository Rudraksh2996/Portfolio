import { ExternalLink, FolderOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "GuardAuth CLI Authentication System",
      description: "Production-quality terminal authentication system with a clean three-tier architecture (Presentation, Business Logic, Data Access). PBKDF2-HMAC-SHA256 password hashing with 32-byte unique salts, constant-time string comparison. Dependency Injection and Repository Pattern to decouple storage logic. Interactive CLI built with rich, with persistent 5-attempt account lockouts and input validation.",
      tech: ["Python", "Rich", "hashlib", "JSON"],
      github: "https://github.com/Rudraksh2996/AuthenticationSystem",
      demo: null
    },
    {
      title: "Expense Tracker",
      description: "A sleek, terminal based Expense Tracker written in Python. Features interactive menus, real time spending analytics with visual text graphs, category breakdowns, and persistent JSON storage.",
      tech: ["Python", "JSON", "CLI"],
      github: "https://github.com/Rudraksh2996/Expense-Tracker",
      demo: null
    },
    {
      title: "Zru Studios Landing Page",
      description: "High-performance interactive landing page using glassmorphism and state-driven micro-interactions. Custom useTilt hook for 3D card manipulation via Framer Motion's useSpring/useMotionValue. Scroll-triggered, lazy-loaded components via useInView. Scalable component library with Bento box layouts, scroll-aware navigation, and animated mockups.",
      tech: ["React.js", "Framer Motion", "JavaScript"],
      github: "https://github.com/Rudraksh2996/zru-studios-landing",
      demo: null
    }
  ];

  return (
    <section id="projects" className="page-section py-24 px-6 sm:px-12 bg-transparent border-b border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-start gap-4 mb-16">
          <h2 className="heading-serif text-[24px] md:text-[36px] leading-[28.8px] md:leading-[40px] tracking-[-0.6px] md:tracking-[-0.9px] font-medium text-foreground">
            Selected <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Works</span>
          </h2>
          <p className="text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] font-normal text-muted-foreground max-w-2xl">
            A showcase of my recent projects focusing on real-time collaboration, full-stack architecture, and seamless user experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative flex flex-col justify-between p-6 sm:p-8 bg-card border border-border/60 rounded-3xl transition-all duration-500 shadow-sm hover:shadow-lg hover:border-border hover:-translate-y-1 overflow-hidden">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-accent/10 text-accent-foreground rounded-xl">
                    <FolderOpen size={28} />
                  </div>
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub Repository">
                        <FaGithub size={20} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent-foreground transition-colors" aria-label="Live Demo">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                
                <h3 className="heading-serif text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] font-medium text-foreground mb-3 group-hover:text-accent-foreground transition-colors">
                  {project.title}
                </h3>
                <p className="text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] font-normal text-muted-foreground mb-8">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-auto">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="px-3 py-1 text-[14px] leading-[20px] font-medium text-foreground bg-card border border-border rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
