import { projects, type Project, type InsertProject } from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private currentId: number;

  constructor() {
    this.projects = new Map();
    this.currentId = 1;
    
    // Add some initial projects for demonstration
    this.seedInitialProjects();
  }

  private async seedInitialProjects() {
    const initialProjects: Omit<Project, 'id' | 'createdAt'>[] = [
      {
        title: "Sorting Algorithm Visualizer",
        description: "Interactive visualization of various sorting algorithms with real-time performance metrics.",
        category: "algorithms"
      },
      {
        title: "3D Function Plotter",
        description: "WebGL-based tool for plotting complex mathematical functions in three dimensions.",
        category: "mathematics"
      },
      {
        title: "Neural Network from Scratch",
        description: "Pure JavaScript implementation of a neural network for handwritten digit recognition.",
        category: "ai"
      },
      {
        title: "Chess Engine",
        description: "AI-powered chess engine with minimax algorithm and position evaluation.",
        category: "games"
      },
      {
        title: "Fractal Generator",
        description: "Real-time fractal generation with zoom and color customization capabilities.",
        category: "mathematics"
      },
      {
        title: "Pathfinding Visualizer",
        description: "Interactive grid-based pathfinding algorithm comparison tool with A*, Dijkstra, and more.",
        category: "algorithms"
      }
    ];

    for (const project of initialProjects) {
      await this.createProject(project);
    }
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    const allProjects = await this.getProjects();
    return allProjects.filter(project => project.category === category);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }
}

export const storage = new MemStorage();
