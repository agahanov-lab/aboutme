import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function About() {
  useScrollAnimation();

  useEffect(() => {
    document.title = "About Me - Mekan";
  }, []);

  const handleResumeDownload = () => {
    // Create a link to download the resume
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Mekan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-24 bg-muted/30 mt-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-section">
          <h1 className="text-4xl md:text-5xl font-light mb-4">About Me</h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Profile Section */}
        <Card className="mb-12 fade-in-section">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-medium">Education</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Mathematics</h3>
                    <p className="text-muted-foreground">CUNY Baruch College, Expected: 2027</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Computer Science Minor</h3>
                    <p className="text-muted-foreground">CUNY Baruch College, Expected: 2027</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-medium">Awards</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Dean's List</h3>
                    <p className="text-muted-foreground">Fall 2023 - Present</p>
                  </div>
                  <div>
                    <h3 className="font-medium">IOI 2023</h3>
                    <p className="text-muted-foreground">Honorable Mention</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-medium">Achievements</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">2x Bronze Medalist</h3>
                    <p className="text-muted-foreground">National Olympiad in Informatics in Turkmenistan</p>
                  </div>
                  <div>
                    <h3 className="font-medium">$40k Top Up Scholarship Recipient</h3>
                    <p className="text-muted-foreground">National Merit Scholarship</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resume Section */}
        <div className="text-center fade-in-section">
          <Card className="inline-block">
            <CardContent className="p-8">
              <h2 className="text-2xl font-medium mb-6">My Resume</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/resume">
                  <Button 
                    variant="outline"
                    className="gap-2 transform hover:scale-105 duration-200"
                  >
                    <Eye className="h-4 w-4" />
                    Preview Resume
                  </Button>
                </Link>
                <Button 
                  onClick={handleResumeDownload}
                  className="gap-2 transform hover:scale-105 duration-200"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
