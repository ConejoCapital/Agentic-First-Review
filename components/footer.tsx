import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="flex items-center justify-center gap-1 text-sm text-gray-500">
          Built with <Heart className="h-3.5 w-3.5 text-red-400" /> by{" "}
          <a
            href="https://github.com/ConejoCapital"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-700 hover:text-indigo-600"
          >
            ConejoCapital
          </a>
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Powered by Claude AI
        </p>
      </div>
    </footer>
  );
}
