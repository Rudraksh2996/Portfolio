import { Award, BookOpen, ExternalLink } from "lucide-react";

export default function Certifications() {
  const certifications = [
    {
      title: "AWS Certified CloudOps Engineer – Associate",
      issuer: "Amazon Web Services",
      date: "",
      icon: <Award className="text-accent-foreground" size={24} />,
      link: ""
    },
    {
      title: "AWS Cloud Foundations Certificate",
      issuer: "Amazon Web Services",
      date: "",
      icon: <Award className="text-accent-foreground" size={24} />,
      link: ""
    }
  ];

  const coursework = [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Introduction to AI/ML",
    "Linear Algebra",
    "Probability & Statistics"
  ];

  return (
    <section id="certifications" className="page-section py-24 px-6 sm:px-12 bg-transparent border-b border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-start gap-4 mb-16">
          <h2 className="heading-serif text-[24px] md:text-[36px] leading-[28.8px] md:leading-[40px] tracking-[-0.6px] md:tracking-[-0.9px] font-medium text-foreground">
            Milestones & <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Continuous Learning</span>
          </h2>
          <p className="text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] font-normal text-muted-foreground max-w-2xl">
            My professional certifications and core academic coursework that form the foundation of my technical expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div className="space-y-6">
            <h3 className="heading-serif text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] font-medium flex items-center gap-3 text-foreground mb-8">
              <Award className="text-accent-foreground" />
              Certifications
            </h3>
            
            <div className="flex flex-col gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="group relative p-6 bg-card border border-border/60 rounded-3xl hover:border-border transition-all duration-500 shadow-sm hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-xl shrink-0">
                        {cert.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[14px] leading-[20px] text-foreground group-hover:text-accent-foreground transition-colors">{cert.title}</h4>
                        <p className="text-[12px] leading-[16px] font-normal text-muted-foreground">{cert.issuer}</p>
                        <p className="text-[12px] leading-[16px] font-mono text-muted-foreground mt-2">{cert.date}</p>
                      </div>
                    </div>
                    {cert.link && cert.link !== "" && (
                      <a href={cert.link} target="_blank" rel="noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors shrink-0">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coursework */}
          <div>
            <h3 className="heading-serif text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] font-medium flex items-center gap-3 text-foreground mb-8">
              <BookOpen className="text-blue-500" />
              Core Coursework
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coursework.map((course, index) => (
                <div key={index} className="p-5 bg-card border border-border/60 rounded-2xl hover:border-border transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-[2px]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                    <span className="font-semibold text-[14px] leading-[20px] text-foreground">{course}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Callout / Extra info */}
            <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
              <p className="text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] font-normal text-foreground">
                <span className="font-semibold text-[14px] leading-[20px] text-blue-600">Education:</span> B.Tech in Information Technology (2024–2028).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
