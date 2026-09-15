import { Code2, Server, Layout, Database, Cloud } from "lucide-react";

export default function TechStack() {
  const categories = [
    {
      title: "Frontend & UI",
      icon: <Layout className="text-accent-foreground" size={24} />,
      skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Framer Motion"]
    },
    {
      title: "Backend & Core",
      icon: <Server className="text-accent-foreground" size={24} />,
      skills: ["Python", "JSON", "Rich CLI", "Data Structures", "OOP"]
    },
    {
      title: "Cloud & Infrastructure",
      icon: <Cloud className="text-accent-foreground" size={24} />,
      skills: ["AWS", "Cloud Operations", "Cloud Foundations"]
    },
    {
      title: "Tools & Ecosystem",
      icon: <Code2 className="text-accent-foreground" size={24} />,
      skills: ["Git", "GitHub", "VS Code", "Problem Solving"]
    }
  ];

  return (
    <section id="tech" className="page-section py-24 px-6 sm:px-12 bg-transparent border-b border-border">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-foreground text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] font-semibold tracking-[0.6px] md:tracking-[0.7px] uppercase mb-8">
          <Cloud size={20} />
          <span>Technical Arsenal</span>
        </div>
        
        <h2 className="heading-serif text-[24px] md:text-[36px] leading-[28.8px] md:leading-[40px] tracking-[-0.6px] md:tracking-[-0.9px] font-medium text-foreground mb-16">
          Tools & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Technologies</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {categories.map((category, index) => (
            <div key={index} className="p-8 bg-card/50 backdrop-blur-sm border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-accent/10 rounded-xl">
                  {category.icon}
                </div>
                <h3 className="heading-serif text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] font-medium text-foreground">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="px-4 py-2 bg-background border border-border rounded-full text-[14px] leading-[20px] font-medium text-foreground hover:border-accent transition-colors cursor-default"
                  >
                    {skill}
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
