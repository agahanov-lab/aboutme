import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Resume() {
  useEffect(() => {
    document.title = "Resume - Mekan";
  }, []);

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Mekan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-24 mt-20 min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <Link href="/about">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to About
            </Button>
          </Link>
          <Button onClick={handleResumeDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-medium mb-4">Resume Preview</h2>
            <p className="text-muted-foreground mb-6">
              This is a placeholder for your actual resume. Upload your PDF resume to the public folder to display it here.
            </p>
            <div className="bg-muted p-12 rounded-lg">
              <div className="max-w-md mx-auto space-y-4">
                <div className="h-4 bg-primary/20 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-primary/20 rounded w-full"></div>
                <div className="h-4 bg-primary/20 rounded w-2/3 mx-auto"></div>
                <div className="h-4 bg-primary/20 rounded w-5/6 mx-auto"></div>
                <div className="h-4 bg-primary/20 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              To display your actual resume, replace the placeholder PDF in the public folder with your resume file.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}