
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Database, Code, LineChart } from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    icon: <Code className="h-5 w-5" />,
    skills: ["SQL", "Python", "R"]
  },
  {
    id: "databases",
    title: "Databases",
    icon: <Database className="h-5 w-5" />,
    skills: ["PostgreSQL", "SQLite", "MySQL"]
  },
  {
    id: "tools",
    title: "Tools & Libraries",
    icon: <LineChart className="h-5 w-5" />,
    skills: ["Power BI", "MS Excel", "Tableau", "Pandas", "NumPy", "SciPy", "Matplotlib"]
  }
];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("languages");

  return (
    <section id="skills" className="section-container">
      <h2 className="section-title">Skills</h2>
      
      <div className="mt-12">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar with categories */}
          <div className="md:w-1/3 lg:w-1/4">
            <div className="sticky top-24 space-y-2">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    "w-full text-left p-4 rounded-lg transition-all duration-200 flex items-center gap-3",
                    activeCategory === category.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted/50 text-muted-foreground"
                  )}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <div className={cn(
                    "p-2 rounded-md",
                    activeCategory === category.id
                      ? "bg-primary/20"
                      : "bg-muted/30"
                  )}>
                    {category.icon}
                  </div>
                  <span>{category.title}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:w-2/3 lg:w-3/4">
            {skillCategories.map((category) => (
              <div
                key={category.id}
                className={cn(
                  "transition-all duration-500",
                  activeCategory === category.id
                    ? "block animate-fade-in"
                    : "hidden"
                )}
              >
                <h3 className="text-2xl font-semibold mb-6">{category.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.skills.map((skill, index) => (
                    <SkillCard 
                      key={index} 
                      skill={skill} 
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface SkillCardProps {
  skill: string;
  delay: number;
}

const SkillCard = ({ skill, delay }: SkillCardProps) => {
  return (
    <div 
      className="p-4 rounded-xl border border-border/50 bg-card/50 relative overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all duration-300"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium">{skill}</h4>
        <div className="h-2 w-2 rounded-full bg-primary/80"></div>
      </div>
    </div>
  );
};

export default SkillsSection;
