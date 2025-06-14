import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
      <CardContent className="p-6">
        <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>
        <Badge variant="secondary" className="capitalize">
          {project.category}
        </Badge>
      </CardContent>
    </Card>
  );
}
