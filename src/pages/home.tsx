import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Calculator, Brain } from "lucide-react";
import GeometricBackground from "@/components/geometric-background";

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Hi, I'm Mekan.";

  useEffect(() => {
    document.title = "Mekan - Portfolio";
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const featureCards = [
    {
      icon: <Code className="h-8 w-8 text-blue-500" />,
      title: "Projects",
      description: "Innovative solutions combining cutting-edge technology with mathematical precision",
      link: "/projects"
    },
    {
      icon: <Calculator className="h-8 w-8 text-purple-500" />,
      title: "About Me",
      description: "Learn about my journey, education, achievements, and passion for mathematics",
      link: "/about"
    },
    {
      icon: <Brain className="h-8 w-8 text-yellow-500" />,
      title: "Blog",
      description: "Insights and thoughts on mathematics, programming, and problem-solving",
      link: "/blog"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pt-20">
      <GeometricBackground />
      
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen py-32">
        <div className="relative z-10 text-center fade-in-section animate-fade-in space-y-32">
          {/* Main Hero */}
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-light tracking-tight hero-glow">
              {displayText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto">
              I love mathematics and competitive programming!
            </p>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
            {featureCards.map((card, index) => (
              <Link key={index} href={card.link}>
                <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-10 text-center">
                    <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-4 group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Galileo Quote */}
          <div className="max-w-4xl mx-auto px-6">
            <Card className="bg-card/60 backdrop-blur-sm border-border/30">
              <CardContent className="p-12">
                <blockquote className="text-xl md:text-2xl font-light text-center mb-6 italic">
                  "Mathematics is the language with which God has written the universe"
                </blockquote>
                <p className="text-muted-foreground text-center">— Galileo Galilei</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
