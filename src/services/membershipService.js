const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function submitMembership(payload) {
  const body = new FormData();
  Object.entries(payload).forEach(([key,value]) => {
    if (key === 'interests') value.forEach(item => body.append('interests', item));
    else body.append(key, value);
  });
  const response = await fetch(`${API_URL}/memberships`, { method:'POST', body });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Submission failed');
  return data;
}
