import { useEffect, useState } from "react";
import { useProjects, useProjectsByCategory } from "@/hooks/use-projects";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import ProjectFilter from "@/components/project-filter";
import ProjectCard from "@/components/project-card";
import MathBackground from "@/components/math-background";
import { Skeleton } from "@/components/ui/skeleton";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data: allProjects, isLoading: allLoading } = useProjects();
  const { data: filteredProjects, isLoading: filteredLoading } = useProjectsByCategory(activeFilter);
  
  useScrollAnimation();

  useEffect(() => {
    document.title = "Projects - Mekan";
  }, []);

  const projects = activeFilter === "all" ? allProjects : filteredProjects;
  const isLoading = activeFilter === "all" ? allLoading : filteredLoading;

  const displayProjects = activeFilter === "all" 
    ? (projects || [])
    : (projects?.filter(project => project.category === activeFilter) || []);

  return (
    <section className="relative py-24 mt-20 overflow-hidden">
      <MathBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-section">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Projects</h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Exploring the intersection of mathematics, algorithms, and innovation
          </p>
        </div>

        <div className="fade-in-section">
          <ProjectFilter 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
        </div>

        <div className="fade-in-section">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProjects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {!isLoading && displayProjects?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
