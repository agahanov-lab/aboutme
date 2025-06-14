import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useBlogs } from "@/hooks/use-projects";

export default function Blog() {
  const { data: blogs, isLoading } = useBlogs();
  useScrollAnimation();

  useEffect(() => {
    document.title = "Blog - Mekan";
  }, []);

  return (
    <section className="py-24 bg-muted/30 mt-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-section">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Blog</h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="space-y-6 fade-in-section">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))
          ) : blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <a
                key={blog.id}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h2 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h2>
                        <p className="text-muted-foreground mb-3">
                          {blog.description}
                        </p>
                        <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                          Read Article
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
