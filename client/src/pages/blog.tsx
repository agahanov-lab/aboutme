import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const blogPosts = [
  {
    title: "Understanding Machine Learning: A Mathematical Perspective",
    description: "Exploring the mathematical foundations that power modern AI systems...",
    url: "https://medium.com/@mekan/understanding-machine-learning"
  },
  {
    title: "Algorithms in Real Life: From Theory to Practice",
    description: "How computer science algorithms solve everyday problems...",
    url: "https://medium.com/@mekan/algorithms-in-real-life"
  },
  {
    title: "The Beauty of Mathematical Proofs",
    description: "Discovering elegance in mathematical reasoning and proof techniques...",
    url: "https://medium.com/@mekan/mathematical-beauty"
  }
];

export default function Blog() {
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
          {blogPosts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-3">
                        {post.description}
                      </p>
                      <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                        Read on Medium
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
