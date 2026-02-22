/**
 * Simulates network/database latency for mock data.
 * Use in every mock fetch to mimic real async behavior.
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
