import { Mail, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-6">
          <div>
            <p className="text-muted-foreground mb-4">Get in touch</p>
            <a
              href="mailto:mekan@example.com"
              className="text-primary hover:underline font-medium inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              mekan@example.com
            </a>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://linkedin.com/in/mekan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-200"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/mekan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-200"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>

          <div className="text-muted-foreground text-sm">
            © 2024 Mekan. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
