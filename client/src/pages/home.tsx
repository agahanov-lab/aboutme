import { useEffect } from "react";
import GeometricBackground from "@/components/geometric-background";

export default function Home() {
  useEffect(() => {
    document.title = "Mekan - Portfolio";
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <GeometricBackground />
      
      <div className="relative z-10 text-center fade-in-section animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight hero-glow mb-6">
          Hi, I'm Mekan.
        </h1>
        <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto">
          Mathematician, Programmer, and Problem Solver
        </p>
      </div>
    </section>
  );
}
