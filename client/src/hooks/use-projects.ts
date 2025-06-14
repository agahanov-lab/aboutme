import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Project, InsertProject } from "@shared/schema";

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });
}

export function useProjectsByCategory(category: string) {
  return useQuery<Project[]>({
    queryKey: ["/api/projects", category],
    enabled: category !== "all",
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: InsertProject) => {
      const response = await apiRequest("POST", "/api/projects", project);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
  });
}

export function useAdminLogin() {
  return useMutation({
    mutationFn: async (password: string) => {
      const response = await apiRequest("POST", "/api/admin/login", { password });
      return response.json();
    },
  });
}
