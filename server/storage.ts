import { projects, blogs, type Project, type InsertProject, type Blog, type InsertBlog } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Project operations
  getProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  
  // Blog operations
  getBlogs(): Promise<Blog[]>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  deleteBlog(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Project operations
  async getProjects(): Promise<Project[]> {
    const result = await db.select().from(projects).orderBy(projects.createdAt);
    return result.reverse(); // Most recent first
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    const result = await db.select().from(projects)
      .where(eq(projects.category, category))
      .orderBy(projects.createdAt);
    return result.reverse();
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Blog operations
  async getBlogs(): Promise<Blog[]> {
    const result = await db.select().from(blogs).orderBy(blogs.createdAt);
    return result.reverse(); // Most recent first
  }

  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const [blog] = await db
      .insert(blogs)
      .values(insertBlog)
      .returning();
    return blog;
  }

  async deleteBlog(id: number): Promise<void> {
    await db.delete(blogs).where(eq(blogs.id, id));
  }
}

export const storage = new DatabaseStorage();
