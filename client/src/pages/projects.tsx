import { useEffect, useState } from "react";
import { useProjects, useProjectsByCategory } from "@/hooks/use-projects";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import ProjectFilter from "@/components/project-filter";
import ProjectCard from "@/components/project-card";
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
    ? projects 
    : projects?.filter(project => project.category === activeFilter) || [];

  return (
    <section className="py-24 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-section">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Projects</h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
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
              {displayProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {!isLoading && displayProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
