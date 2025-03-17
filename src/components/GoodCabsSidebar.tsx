
import React from "react";
import { 
  Eye, 
  Database, 
  Monitor, 
  Lightbulb, 
  GraduationCap, 
  Link2, 
  FileText, 
  Rocket 
} from "lucide-react";

const GoodCabsSidebar = () => {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40">
      <div className="bg-background/90 backdrop-blur-md shadow-lg rounded-r-lg border border-border/50 overflow-hidden">
        <div className="py-4 px-2">
          <nav className="flex flex-col space-y-1">
            <SidebarLink href="#overview" icon={<Eye size={18} />} label="Overview" />
            <SidebarLink href="#data-setup" icon={<Database size={18} />} label="Data Setup" />
            <SidebarLink href="#dashboard" icon={<Monitor size={18} />} label="Dashboard" />
            <SidebarLink href="#insights" icon={<Lightbulb size={18} />} label="Insights" />
            <SidebarLink href="#challenges" icon={<GraduationCap size={18} />} label="Challenges" />
            <SidebarLink href="#files" icon={<FileText size={18} />} label="Files" />
            <SidebarLink href="#conclusion" icon={<Rocket size={18} />} label="Conclusion" />
          </nav>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
  return (
    <a 
      href={href} 
      className="flex items-center gap-2 p-2 text-sm font-medium rounded-md text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors"
      title={label}
    >
      <span className="text-primary">{icon}</span>
      <span className="hidden group-hover:block">{label}</span>
    </a>
  );
};

export default GoodCabsSidebar;
