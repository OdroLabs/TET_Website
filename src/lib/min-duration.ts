/**
 * Keeps a pending UI state visible for at least `ms`, so fast round-trips
 * (e.g. a local DB) don't flash a loading state faster than a user can see.
 */
export async function withMinDuration<T>(promise: Promise<T>, ms = 450): Promise<T> {
  const [result] = await Promise.all([promise, new Promise((resolve) => setTimeout(resolve, ms))]);
  return result;
}
