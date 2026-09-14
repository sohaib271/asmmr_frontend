const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL = configuredApiUrl || 'https://asmmr.org/api'

export async function submitMembership(payload) {
  const body = new FormData();
  Object.entries(payload).forEach(([key,value]) => {
    if (key === 'interests') value.forEach(item => body.append('interests', item));
    else body.append(key, value);
  });
  const response = await fetch(`${API_URL}/memberships`, { method:'POST', body });
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;
  if (!response.ok) throw new Error(data?.message || `Submission failed (${response.status})`);
  return data;
}
