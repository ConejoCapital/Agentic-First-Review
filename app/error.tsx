"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="mb-4 h-12 w-12 text-red-500" />
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Something went wrong
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-background hover:bg-accent-hover"
      >
        Try Again
      </button>
    </div>
  );
}
