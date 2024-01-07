/**
 * Simulate latency and error from an api call
 * @param data
 * @param successRate - from 0 to 1
 * @param maxDelay - in milliscond
 * @returns
 */
export const simulateApiCall = <T>(
  data: T,
  successRate: number = 0.8,
  maxDelay: number = 1000,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * maxDelay; // Random delay up to maxDelay milliseconds
    const shouldFail = Math.random() >= successRate; // Failure based on success rate

    setTimeout(() => {
      if (shouldFail) {
        reject("Fake random network or server error occurred");
      } else {
        resolve(data);
      }
    }, delay);
  });
};
