"use client";

import { Mail, FileText, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import InteractiveCube from "./InteractiveCube";
import SlideTextButton from "./kokonutui/slide-text-button";
import BackgroundPaths from "./kokonutui/background-paths";

export default function Hero() {
  const { scrollYProgress } = useScroll();
  // Fade out the hero cube between 0 and 15% scroll
  const cubeOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const cubeScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);

  return (
    <section id="hero" className="page-section relative min-h-screen flex items-center justify-center overflow-hidden px-6 sm:px-12 pt-20">
      {/* Background blobs and subtle motion paths */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-multiply">
        <BackgroundPaths title="" />
      </div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-none">
        {/* Text Content */}
        <div className="flex flex-col items-start gap-6 z-10 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Available for opportunities
          </div>
          
          <h1 className="heading-serif text-[36px] md:text-[60px] leading-[37.8px] md:leading-[60px] tracking-[-0.9px] md:tracking-[-1.5px] font-medium text-foreground">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Rudraksh Sharma</span>
          </h1>
          
          <p className="text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] font-semibold tracking-[0.6px] md:tracking-[0.7px] uppercase text-foreground max-w-lg">
            Aspiring Web Developer | Python Enthusiast | B.Tech IT
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <SlideTextButton 
              href="#projects"
              text="View My Work"
              hoverText="See Projects"
              variant="default"
            />
            
            <SlideTextButton 
              href="/resume.pdf"
              text="Resume"
              hoverText="Download PDF"
              variant="ghost"
              target="_blank"
            />
          </div>

          <div className="flex items-center gap-4 mt-6">
            <a href="mailto:sharmarudraksh840@gmail.com" className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
              <Mail size={24} />
            </a>
            <a href="https://github.com/Rudraksh2996" target="_blank" rel="noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/rudraksh2996/" target="_blank" rel="noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* 3D Sketchy Cube */}
        <div className="flex justify-center lg:justify-end z-10 w-full h-[300px] md:h-[400px] pointer-events-auto relative">
          {/* Subtle glow for dark mode to frame the light cube */}
          <div className="absolute top-1/2 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-24 -translate-y-1/2 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none transition-opacity opacity-0 dark:opacity-100 mix-blend-screen" />
          <InteractiveCube />
        </div>
      </div>
    </section>
  );
}
