/**
 * Central browser API adapter. Endpoint paths are provisional until the backend owner confirms them.
 * This module does not create, store, or refresh authentication credentials.
 */
export function createApiClient({ baseUrl = '/api', fetchImpl = globalThis.fetch, timeoutMs = 10_000 } = {}) {
  if (typeof fetchImpl !== 'function') throw new TypeError('A Fetch-compatible function is required.');
  const request = async (path, { method = 'GET', body, signal } = {}) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(new DOMException('Request timed out', 'TimeoutError')), timeoutMs);
    signal?.addEventListener('abort', () => controller.abort(signal.reason), { once: true });
    try {
      const origin = globalThis.location?.origin || 'https://marketcraft.invalid';
      const base = new URL(`${baseUrl.replace(/\/$/, '')}/`, origin);
      const response = await fetchImpl(new URL(path.replace(/^\//, ''), base), {
        method,
        headers: { Accept: 'application/json', ...(body === undefined ? {} : { 'Content-Type': 'application/json' }) },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: controller.signal,
      });
      const contentType = response.headers?.get?.('content-type') || '';
      const data = contentType.includes('application/json') ? await response.json() : null;
      if (!response.ok) {
        const error = new Error(data?.message || `API request failed (${response.status}).`);
        error.status = response.status;
        error.data = data;
        throw error;
      }
      return data;
    } finally {
      clearTimeout(timer);
    }
  };
  return Object.freeze({ request });
}
