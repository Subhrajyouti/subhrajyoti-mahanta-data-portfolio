
import { Button } from "@/components/ui/button";
import { ChevronDown, Download } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Initialize the canvas animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      const size = Math.min(window.innerWidth / 3, 300);
      canvas.width = size;
      canvas.height = size;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles for data flow animation
    const particles: { x: number; y: number; speed: number; size: number; color: string }[] = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 2,
        size: 1 + Math.random() * 3,
        color: `rgba(${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 100 + 120)}, ${Math.floor(Math.random() * 55 + 200)}, ${0.5 + Math.random() * 0.5})`
      });
    }
    
    // Draw connections between particles that are close
    const drawConnections = (ctx: CanvasRenderingContext2D, particles: any[]) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 70) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79, 70, 229, ${0.2 - (distance / 70) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Move particle from bottom to top (data flowing upward)
        particle.y -= particle.speed;
        
        // Reset position when particle goes off-screen
        if (particle.y < -particle.size) {
          particle.y = canvas.height + particle.size;
          particle.x = Math.random() * canvas.width;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Draw connections
      drawConnections(ctx, particles);
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationRef.current);
    };
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2">
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
                  className="rounded-md border-primary/30 text-foreground hover:bg-primary/10 transition-all gap-2"
                >
                  <a href="/resume.pdf" download>
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Data Flow Animation */}
          <div className={`md:w-1/2 flex justify-center mt-12 md:mt-0 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}>
            <div className="relative">
              {/* Glow background */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 blur-sm"></div>
              
              {/* Canvas container */}
              <div className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-full shadow-xl bg-black/10 backdrop-blur-sm">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full"
                ></canvas>
              </div>
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
