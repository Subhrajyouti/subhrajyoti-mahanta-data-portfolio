import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const ResumeSection = () => {
  return (
    <section id="resume" className="section-container">
      <h2 className="section-title">Resume</h2>
      
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-card border border-border/50 rounded-xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-semibold">My Resume</h3>
              </div>
              <p className="text-muted-foreground">
                Download my resume to learn more about my skills, experience, and education.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="rounded-md gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <a 
                href="https://drive.google.com/drive/folders/1CygdsRYNp0oD3qa2sFHRaOcNQobZNlXh?usp=drive_link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button variant="outline" className="rounded-md gap-2">
                  <FileText className="h-4 w-4" />
                  View Online
                </Button>
              </a>
            </div>
          </div>
          
          <div className="mt-8 border-t border-border/50 pt-8">
            <div className="aspect-[1.414/1] bg-muted/30 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Resume preview placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;