import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  useAdminLogin, 
  useCreateProject, 
  useDeleteProject, 
  useProjects,
  useCreateBlog,
  useDeleteBlog,
  useBlogs
} from "@/hooks/use-projects";
import { useToast } from "@/hooks/use-toast";
import { Lock, Plus, Trash2, ExternalLink } from "lucide-react";
import type { InsertProject, InsertBlog } from "@shared/schema";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [projectData, setProjectData] = useState<InsertProject>({
    title: "",
    description: "",
    category: "",
  });

  const { toast } = useToast();
  const adminLogin = useAdminLogin();
  const createProject = useCreateProject();

  useEffect(() => {
    document.title = "Admin Panel - Mekan";
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await adminLogin.mutateAsync(password);
      if (result.success) {
        setIsLoggedIn(true);
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectData.title || !projectData.description || !projectData.category) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await createProject.mutateAsync(projectData);
      toast({
        title: "Success",
        description: "Project added successfully",
      });
      setProjectData({ title: "", description: "", category: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="py-24 bg-gray-100 mt-20 min-h-[calc(100vh-80px)]">
        <div className="max-w-md mx-auto px-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={adminLogin.isPending}
                >
                  {adminLogin.isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-100 mt-20 min-h-[calc(100vh-80px)]">
      <div className="max-w-2xl mx-auto px-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Project
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProjectSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={projectData.title}
                  onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                  placeholder="Enter project description"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={projectData.category} 
                  onValueChange={(value) => setProjectData({ ...projectData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="algorithms">Algorithms</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="games">Games</SelectItem>
                    <SelectItem value="ai">AI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={createProject.isPending}
              >
                {createProject.isPending ? "Adding Project..." : "Add Project"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
