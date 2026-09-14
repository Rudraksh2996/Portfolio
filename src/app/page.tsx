import Hero from "@/components/Hero";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";


export default function Home() {
  return (
    <div className="relative bg-background min-h-screen text-foreground">

      <main className="relative z-10">
        <Hero />
        <About />
        <Certifications />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
}
