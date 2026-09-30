const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
export const API_URL = (configuredApiUrl || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api')).replace(/\/$/, '');

const statusMessages = {
  400: 'Please check the information you entered and try again.',
  401: 'Email or password is incorrect.',
  403: 'This request was blocked. Reload the page and try again.',
  404: 'The sign-in service could not be found. Please contact support.',
  429: 'Too many sign-in attempts. Please wait a few minutes and try again.',
  502: 'The sign-in service is temporarily unavailable. Please try again shortly.',
  503: 'The sign-in service is temporarily unavailable. Please try again shortly.',
  504: 'The sign-in request timed out. Please try again.',
};

export async function api(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      credentials: 'include',
      ...options,
      headers: options.body instanceof FormData ? options.headers : { 'Content-Type': 'application/json', ...options.headers },
    });
  } catch {
    throw new Error('Could not connect to the sign-in service. Check your connection and try again.');
  }
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json().catch(() => ({})) : {};
  if (!response.ok) {
    const error = new Error(data.message || statusMessages[response.status] || (response.status >= 500
      ? 'The sign-in service encountered an error. Please try again later.'
      : `The request could not be completed (${response.status}).`));
    error.status = response.status;
    error.errors = data.errors || {};
    throw error;
  }
  return data;
}
