"use client";
import { useState } from "react";
import { Mail, ExternalLink, Copy, Check } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="page-section py-24 px-6 sm:px-12 bg-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-4 bg-accent/10 text-accent rounded-full mb-8">
          <Mail size={32} />
        </div>
        
        <h2 className="font-sans text-[24px] md:text-[36px] font-bold text-foreground mb-6 tracking-tight">
          Let&apos;s Work Together
        </h2>
        
        <p className="text-[14px] md:text-[16px] text-muted-foreground max-w-2xl mx-auto mb-12">
          I&apos;m currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
        </p>

        <div className="flex flex-col items-center gap-4">
          <a 
            href="mailto:sharmarudraksh840@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground font-semibold text-[16px] hover:opacity-90 transition-opacity"
          >
            Say Hello
          </a>
          
          <div className="flex items-center gap-2 mt-2 px-4 py-2 rounded-full bg-muted border border-border max-w-full">
            <span className="text-sm font-medium text-foreground break-all">{`sharmarudraksh840@gmail.com`}</span>
            <CopyButton text="sharmarudraksh840@gmail.com" />
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[14px] font-normal text-muted-foreground">
            © {new Date().getFullYear()} Rudraksh Sharma. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/Rudraksh2996" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/rudraksh2996/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="https://leetcode.com/u/Rudraksh_29/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-mono text-sm" aria-label="LeetCode">
              LeetCode <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="p-3 -m-1.5 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-md transition-colors"
      aria-label="Copy email address"
      title="Copy email"
      style={{ minWidth: '44px', minHeight: '44px' }}
    >
      <div className="flex items-center justify-center h-full w-full">
        {copied ? <Check size={16} className="text-accent dark:text-white" /> : <Copy size={16} />}
      </div>
    </button>
  );
}
