"use client";

import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import InteractiveCube from "./InteractiveCube";
import { BackgroundLines } from "./ui/background-lines";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export default function Hero() {
  const { scrollYProgress } = useScroll();
  // Fade out the hero cube between 0 and 15% scroll
  const cubeOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const cubeScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);

  return (
    <section id="hero" className="page-section relative min-h-screen flex items-center justify-center overflow-hidden px-6 sm:px-12 pt-20">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hidden dark:block absolute inset-0 z-0">
          <ShootingStars />
          <StarsBackground />
        </div>
        <BackgroundLines className="absolute inset-0 z-0 flex items-center justify-center opacity-30 dark:opacity-20"><div /></BackgroundLines>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-none z-10">
        {/* Text Content */}
        <div className="flex flex-col items-start gap-6 pointer-events-auto">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
            Available for opportunities
          </div>
          
          <h1 className="font-sans text-[48px] md:text-[72px] leading-[1.1] tracking-tighter font-extrabold text-foreground">
            Hi, I&apos;m <br />
            <span className="text-accent dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:to-gray-500">Rudraksh Sharma</span>
          </h1>
          
          <p className="text-[16px] md:text-[18px] leading-relaxed font-normal text-muted-foreground max-w-lg">
            Aspiring Web Developer | Python Enthusiast | B.Tech IT
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-primary text-primary-foreground dark:text-white flex items-center space-x-2 px-6 py-2 rounded-full font-medium"
            >
              <Link href="#projects">View My Work</Link>
            </HoverBorderGradient>
            
            <Link 
              href="/resume.pdf"
              target="_blank"
              className="px-6 py-2 rounded-full border border-border bg-card text-foreground font-medium hover:bg-muted/30 transition-colors"
            >
              Resume
            </Link>
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
        <div className="flex justify-center lg:justify-end z-20 w-full h-[300px] md:h-[400px] pointer-events-auto relative">
          <InteractiveCube />
        </div>
      </div>
    </section>
  );
}
