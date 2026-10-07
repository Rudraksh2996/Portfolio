"use client";

import { ExternalLink, FolderOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

export default function Projects() {
  const projects = [
    {
      title: "GuardAuth CLI Authentication System",
      description: "Production-quality terminal authentication system with a clean three-tier architecture (Presentation, Business Logic, Data Access). PBKDF2-HMAC-SHA256 password hashing with 32-byte unique salts, constant-time string comparison. Dependency Injection and Repository Pattern to decouple storage logic.",
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
      description: "High-performance interactive landing page using glassmorphism and state-driven micro-interactions. Custom useTilt hook for 3D card manipulation via Framer Motion's useSpring/useMotionValue. Scroll-triggered, lazy-loaded components via useInView.",
      tech: ["React.js", "Framer Motion", "JavaScript"],
      github: "https://github.com/Rudraksh2996/zru-studios-landing",
      demo: null
    }
  ];

  return (
    <section id="projects" className="page-section py-24 px-6 sm:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-start gap-4 mb-16">
          <h2 className="font-sans text-[24px] md:text-[36px] font-bold text-foreground tracking-tight">
            Selected Works
          </h2>
          <p className="text-[14px] md:text-[16px] text-muted-foreground max-w-2xl">
            A showcase of my recent projects focusing on real-time collaboration, full-stack architecture, and seamless user experiences.
          </p>
        </div>

        <BentoGrid className="mx-auto max-w-6xl">
          {projects.map((project, i) => (
            <BentoGridItem
              key={i}
              title={project.title}
              description={
                <div className="flex flex-col h-full mt-4">
                  <p className="text-sm text-muted-foreground flex-grow mb-6">{project.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              }
              header={
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-accent/10 text-accent rounded-xl">
                    <FolderOpen size={24} />
                  </div>
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors z-20 relative">
                        <FaGithub size={20} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors z-20 relative">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              }
              className={i === 0 ? "md:col-span-2" : "md:col-span-1"}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
