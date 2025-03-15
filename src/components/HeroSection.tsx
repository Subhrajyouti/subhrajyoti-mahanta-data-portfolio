
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background to-primary/5 dark:to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full filter blur-3xl" />
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 py-32 md:py-0">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-10">
          <div 
            className={`space-y-6 transition-all duration-700 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <div className="inline-block">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                Data Analyst
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight md:leading-tight">
              Subhrajyoti <span className="text-gradient">Mahanta</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Data Analyst specializing in LIDAR sensor integration, data validation, and turning complex datasets into actionable insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                asChild
                className="rounded-md bg-primary text-white hover:bg-primary/90 transition-all"
              >
                <a href="#projects">View Projects</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-md border-primary/30 text-foreground hover:bg-primary/10 transition-all"
              >
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <a 
        href="#intro"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="h-10 w-10 text-muted-foreground/50" />
      </a>
    </section>
  );
};

export default HeroSection;
