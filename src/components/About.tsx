import { User } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="page-section min-h-screen py-24 px-6 sm:px-12 flex flex-col justify-center items-center text-center bg-transparent">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center justify-center p-4 bg-accent/10 text-accent-foreground rounded-full mb-8">
          <User size={32} />
        </div>
        
        <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-foreground leading-tight">
          Enthusiastic B.Tech Information Technology student at KIET Group of Institutions with a strong foundation in Python and web development.
        </h2>
        
        <p className="text-xl sm:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
          AWS certified with demonstrated knowledge in cloud operations and infrastructure fundamentals. Eager to apply programming skills in real-world projects and seeking a Summer 2026 Web Development Internship to grow as a software professional.
        </p>
        
        <p className="text-lg sm:text-xl text-accent-foreground font-medium max-w-3xl mx-auto leading-relaxed mt-4">
          🚀 2nd Year Engg | Python Developer on a relentless sprint toward Agentic AI. Building systems that don't just execute, but think.
        </p>
      </div>
    </section>
  );
}
