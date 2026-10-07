import { User } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="page-section py-24 px-6 sm:px-12 flex flex-col justify-center items-center text-center bg-transparent">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center justify-center p-4 bg-accent/10 text-accent rounded-full mb-8">
          <User size={32} />
        </div>
        
        <h2 className="font-sans text-[24px] md:text-[36px] leading-tight tracking-tight font-semibold text-foreground">
          Enthusiastic B.Tech Information Technology student with a strong foundation in Python and web development.
        </h2>
        
        <p className="text-[14px] md:text-[16px] leading-relaxed font-normal text-muted-foreground max-w-3xl mx-auto">
          AWS certified with demonstrated knowledge in cloud operations and infrastructure fundamentals. Eager to apply programming skills in real-world projects and seeking a Summer 2026 Web Development Internship to grow as a software professional.
        </p>
        
        <p className="text-[14px] md:text-[16px] leading-relaxed font-medium text-accent max-w-3xl mx-auto mt-4">
          🚀 2nd Year Engg | Python Developer on a relentless sprint toward Agentic AI. Building systems that don&apos;t just execute, but think.
        </p>
      </div>
    </section>
  );
}
