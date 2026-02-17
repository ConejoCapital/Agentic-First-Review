const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const FREE_TIER_LIMIT = parseInt(process.env.FREE_TIER_LIMIT_PER_DAY || "1", 10);

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const existing = rateLimitMap.get(ip);

  if (!existing || now > existing.resetAt) {
    // Reset or create entry
    const resetAt = now + 24 * 60 * 60 * 1000; // 24 hours
    rateLimitMap.set(ip, { count: 1, resetAt });
    return { allowed: true, remaining: FREE_TIER_LIMIT - 1, resetAt };
  }

  if (existing.count >= FREE_TIER_LIMIT) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count++;
  return {
    allowed: true,
    remaining: FREE_TIER_LIMIT - existing.count,
    resetAt: existing.resetAt,
  };
}
