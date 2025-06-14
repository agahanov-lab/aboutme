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
  const [blogData, setBlogData] = useState<InsertBlog>({
    title: "",
    description: "",
    url: "",
  });

  const { toast } = useToast();
  const adminLogin = useAdminLogin();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const createBlog = useCreateBlog();
  const deleteBlog = useDeleteBlog();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: blogs, isLoading: blogsLoading } = useBlogs();

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

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!blogData.title || !blogData.description || !blogData.url) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await createBlog.mutateAsync(blogData);
      toast({
        title: "Success",
        description: "Blog added successfully",
      });
      setBlogData({ title: "", description: "", url: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add blog",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProject.mutateAsync(id);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBlog = async (id: number) => {
    try {
      await deleteBlog.mutateAsync(id);
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog",
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
                Welcome Mekan!
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
      <div className="max-w-6xl mx-auto px-6">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Add Project Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Project
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="project-title">Project Title</Label>
                      <Input
                        id="project-title"
                        value={projectData.title}
                        onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                        placeholder="Enter project title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="project-description">Project Description</Label>
                      <Textarea
                        id="project-description"
                        value={projectData.description}
                        onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                        placeholder="Enter project description"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="project-category">Category</Label>
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
                      {createProject.isPending ? "Adding..." : "Add Project"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Projects List */}
              <Card>
                <CardHeader>
                  <CardTitle>Existing Projects</CardTitle>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  {projectsLoading ? (
                    <p>Loading projects...</p>
                  ) : projects && projects.length > 0 ? (
                    <div className="space-y-3">
                      {projects.map((project) => (
                        <div key={project.id} className="flex items-start justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{project.title}</h4>
                            <p className="text-sm text-muted-foreground mb-1">{project.description}</p>
                            <span className="text-xs bg-secondary px-2 py-1 rounded capitalize">
                              {project.category}
                            </span>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                            disabled={deleteProject.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No projects yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blogs" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Add Blog Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Blog
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBlogSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="blog-title">Blog Title</Label>
                      <Input
                        id="blog-title"
                        value={blogData.title}
                        onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                        placeholder="Enter blog title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="blog-description">Blog Description</Label>
                      <Textarea
                        id="blog-description"
                        value={blogData.description}
                        onChange={(e) => setBlogData({ ...blogData, description: e.target.value })}
                        placeholder="Enter blog description"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="blog-url">Blog URL</Label>
                      <Input
                        id="blog-url"
                        type="url"
                        value={blogData.url}
                        onChange={(e) => setBlogData({ ...blogData, url: e.target.value })}
                        placeholder="https://medium.com/@yourusername/article"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={createBlog.isPending}
                    >
                      {createBlog.isPending ? "Adding..." : "Add Blog"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Blogs List */}
              <Card>
                <CardHeader>
                  <CardTitle>Existing Blogs</CardTitle>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  {blogsLoading ? (
                    <p>Loading blogs...</p>
                  ) : blogs && blogs.length > 0 ? (
                    <div className="space-y-3">
                      {blogs.map((blog) => (
                        <div key={blog.id} className="flex items-start justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{blog.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{blog.description}</p>
                            <a 
                              href={blog.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                            >
                              View Blog <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteBlog(blog.id)}
                            disabled={deleteBlog.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No blogs yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
