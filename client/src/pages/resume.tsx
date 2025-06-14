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
          <iframe
            src="https://docs.google.com/viewer?url=https://your-domain.replit.app/resume.pdf&embedded=true"
            width="100%"
            height="800px"
            className="border-0"
            title="Resume Preview"
          >
            <p>Your browser does not support PDFs. 
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Download the PDF
              </a>
            </p>
          </iframe>
        </div>
      </div>
    </section>
  );
}