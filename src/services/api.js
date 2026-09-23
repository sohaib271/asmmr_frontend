const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
export const API_URL = (configuredApiUrl || 'http://localhost:5000/api').replace(/\/$/, '');

export async function api(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers: options.body instanceof FormData ? options.headers : { 'Content-Type': 'application/json', ...options.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong. Please try again.');
    error.status = response.status;
    error.errors = data.errors || {};
    throw error;
  }
  return data;
}
