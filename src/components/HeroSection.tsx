
import { Button } from "@/components/ui/button";
import { ChevronDown, Download } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 400;
    canvas.height = 400;
    
    // Black hole parameters
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const blackHoleRadius = 40;
    const eventHorizonRadius = 60;
    const accretionDiskRadius = 100;
    
    // Stars/particles for space-time fabric
    const particles: { x: number; y: number; size: number; speed: number; angle: number; distanceFromCenter: number }[] = [];
    
    // Create particles representing the space-time fabric
    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * canvas.width * 0.6 + canvas.width * 0.2;
      
      particles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        angle,
        distanceFromCenter: distance
      });
    }
    
    // Animation variables
    let rotation = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw space-time fabric grid (curved around black hole)
      drawSpaceTimeFabric(ctx, centerX, centerY);
      
      // Draw accretion disk (spinning matter around black hole)
      rotation += 0.01;
      drawAccretionDisk(ctx, centerX, centerY, accretionDiskRadius, rotation);
      
      // Draw event horizon (point of no return)
      ctx.beginPath();
      ctx.arc(centerX, centerY, eventHorizonRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30, 30, 40, 0.8)';
      ctx.fill();
      
      // Draw black hole
      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
      
      // Draw gravitational lensing effect
      drawGravitationalLensing(ctx, centerX, centerY, eventHorizonRadius * 2);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Calculate gravitational effect
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Gravitational pull increases as particles get closer
        const gravitationalPull = Math.max(0.1, 10 / (distance + 1));
        
        // Move particles toward black hole with increasing speed
        const angle = Math.atan2(dy, dx);
        particle.x += Math.cos(angle) * particle.speed * gravitationalPull;
        particle.y += Math.sin(angle) * particle.speed * gravitationalPull;
        
        // Particles that get too close to black hole reset to outer area
        if (distance < eventHorizonRadius) {
          // Reset particle to a random position on the edge
          const newAngle = Math.random() * Math.PI * 2;
          const newDistance = canvas.width * 0.8;
          particle.x = centerX + Math.cos(newAngle) * newDistance;
          particle.y = centerY + Math.sin(newAngle) * newDistance;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Color based on distance from black hole (blue to white)
        const intensity = Math.min(1, 255 / (distance + 50));
        const blue = Math.floor(200 + intensity * 55);
        const green = Math.floor(150 + intensity * 105);
        const red = Math.floor(100 + intensity * 155);
        
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  // Function to draw the curved space-time fabric
  const drawSpaceTimeFabric = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number) => {
    const gridSize = 30;
    const distortion = 100; // Higher value = more curvature
    
    ctx.strokeStyle = 'rgba(100, 150, 255, 0.15)';
    ctx.lineWidth = 0.5;
    
    // Draw horizontal grid lines
    for (let y = 0; y < ctx.canvas.height; y += gridSize) {
      ctx.beginPath();
      for (let x = 0; x < ctx.canvas.width; x += 5) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const displacement = distortion / (distance + distortion / 10);
        
        // Calculate curved grid point
        const newY = y + (dy < 0 ? -displacement : displacement) * Math.abs(dy) / 30;
        
        if (x === 0) {
          ctx.moveTo(x, newY);
        } else {
          ctx.lineTo(x, newY);
        }
      }
      ctx.stroke();
    }
    
    // Draw vertical grid lines
    for (let x = 0; x < ctx.canvas.width; x += gridSize) {
      ctx.beginPath();
      for (let y = 0; y < ctx.canvas.height; y += 5) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const displacement = distortion / (distance + distortion / 10);
        
        // Calculate curved grid point
        const newX = x + (dx < 0 ? -displacement : displacement) * Math.abs(dx) / 30;
        
        if (y === 0) {
          ctx.moveTo(newX, y);
        } else {
          ctx.lineTo(newX, y);
        }
      }
      ctx.stroke();
    }
  };
  
  // Function to draw the accretion disk
  const drawAccretionDisk = (
    ctx: CanvasRenderingContext2D, 
    centerX: number, 
    centerY: number, 
    radius: number,
    rotation: number
  ) => {
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.6,
      centerX, centerY, radius
    );
    
    gradient.addColorStop(0, 'rgba(255, 100, 20, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 200, 100, 0.5)');
    gradient.addColorStop(1, 'rgba(100, 50, 255, 0.1)');
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    ctx.translate(-centerX, -centerY);
    
    // Draw disk with gradient
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius, radius * 0.3, 0, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add some "hotspots" in the disk
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + rotation * 2;
      const distance = radius * (0.65 + Math.random() * 0.25);
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance * 0.3;
      const spotSize = 2 + Math.random() * 8;
      
      ctx.beginPath();
      ctx.arc(x, y, spotSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, ${150 + Math.random() * 105}, ${50 + Math.random() * 100}, ${0.5 + Math.random() * 0.5})`;
      ctx.fill();
    }
    
    ctx.restore();
  };
  
  // Function to draw gravitational lensing effect
  const drawGravitationalLensing = (
    ctx: CanvasRenderingContext2D, 
    centerX: number, 
    centerY: number, 
    radius: number
  ) => {
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.3,
      centerX, centerY, radius
    );
    
    gradient.addColorStop(0, 'rgba(30, 30, 100, 0.6)');
    gradient.addColorStop(0.5, 'rgba(50, 50, 150, 0.3)');
    gradient.addColorStop(1, 'rgba(50, 70, 200, 0)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  };

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
               Turning complex datasets into actionable insights
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
          
          {/* Black Hole Animation */}
          <div className={`md:w-1/2 flex justify-center mt-12 md:mt-0 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}>
            <div className="relative">
              {/* Glowing effect around canvas */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/30 blur-md"></div>
              
              {/* Canvas for black hole animation */}
              <div className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-full shadow-xl">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full object-cover"
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
