export default function ReviewLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background/80 px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="w-16" />
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/4 animate-pulse rounded-full bg-accent/30" />
        </div>
        <div className="flex justify-center gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <div className="h-8 w-24 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
