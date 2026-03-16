import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-8">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          SEO for the Agentic Web
        </p>
        <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
          Built with <Heart className="h-3.5 w-3.5 text-red-400" /> by{" "}
          <a
            href="https://github.com/ConejoCapital"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-accent"
          >
            ConejoCapital
          </a>
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Powered by Claude AI
        </p>
      </div>
    </footer>
  );
}
