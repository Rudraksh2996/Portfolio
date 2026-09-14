import { Mail, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="page-section py-24 px-6 sm:px-12 bg-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-4 bg-accent/10 text-accent-foreground rounded-full mb-8">
          <Mail size={32} />
        </div>
        
        <h2 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-foreground mb-6">
          Let's Work Together
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
        </p>

        <a 
          href="mailto:rudrakshsharma2026@gmail.com"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-bold text-lg hover:bg-accent/90 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] hover:-translate-y-1"
        >
          Say Hello
        </a>

        <div className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground font-medium">
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
