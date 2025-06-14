import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Code, Brain, Gamepad2 } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "mathematics":
      return <Calculator className="h-5 w-5" />;
    case "algorithms":
      return <Code className="h-5 w-5" />;
    case "ai":
      return <Brain className="h-5 w-5" />;
    case "games":
      return <Gamepad2 className="h-5 w-5" />;
    default:
      return <Code className="h-5 w-5" />;
  }
};

const getMathSymbol = (category: string) => {
  switch (category) {
    case "mathematics":
      return "∫";
    case "algorithms":
      return "→";
    case "ai":
      return "∑";
    case "games":
      return "≈";
    default:
      return "∞";
  }
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden bg-card/90 backdrop-blur-sm">
      <div className="absolute top-4 right-4 text-6xl font-light text-primary/10 group-hover:text-primary/20 transition-colors duration-300">
        {getMathSymbol(project.category)}
      </div>
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-medium group-hover:text-primary transition-colors flex-1 pr-4">
            {project.title}
          </h3>
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="capitalize flex items-center gap-2">
            {getCategoryIcon(project.category)}
            {project.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
