import { Button } from "@/components/ui/button";

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { value: "all", label: "All" },
  { value: "algorithms", label: "Algorithms" },
  { value: "mathematics", label: "Mathematics" },
  { value: "games", label: "Games" },
  { value: "ai", label: "AI" },
];

export default function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "default" : "outline"}
          onClick={() => onFilterChange(filter.value)}
          className="px-6 py-3 font-medium transition-all duration-300"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
